# sky-storage

MERN: Fullstack cloud storage project includes standard remote storage functionality, as well as data backup and sync capabilities between devices

[Figma layout](https://www.figma.com/file/9bROgM7MNz8L3AGY4iCb4v/sky-storage?type=design&node-id=0%3A1&mode=design&t=xD0rnnoroZUIeDvW-1)

Frontend: React / TypeScript / SCSS / Redux Toolkit / RTK Query

Backend: NodeJS / ExpressJS

Database: MongoDB


### 1. Общая архитектура (без изменений в концепции)

Пользователь -> DNS -> Nginx Ingress Controller (в K8s) -> Frontend Service / Backend Service. Backend общается с MongoDB. Все это работает в Kubernetes кластере, созданном с помощью Terraform. Развертывание и мониторинг — через Ansible, Prometheus и Grafana.

**Визуальная схема (меняем только названия в блоках):**

`
+-----------------------------------------------------------------------------------------+
|                                     Интернет (Пользователь)                             |
+-----------------------------------------------------------------------------------------+
                                              | DNS (my-finance-app.com)
                                              v
+--------------------------[ Облачный провайдер (AWS, GCP, etc.) ]--------------------------+
|                                                                                           |
|  +---------------------------+       +-----------------------------------------------+    |
|  |     Terraform (IaC)       | ----> |          Kubernetes Кластер (EKS, GKE)        |    |
|  | (Создает VPC, K8s, DB...) |       |                                               |    |
|  +---------------------------+       |  +------------------[ Входящий трафик ]----------+ |
|                                      |  |                                               | |
|  +---------------------------+       |  |              Nginx Ingress Controller         | |
|  |     Ansible (Config)      | ----> |  |                 (Load Balancer)               | |
|  |  (Деплоит приложение,     |       |  |                                               | |
|  |   настраивает Helm...)    |       |  +-------+-------------------------+-------------+ |
|  +---------------------------+       |          | ("/api/*")              | ("/")         |
|                                      |          v                         v               |
|                                      |  +----------------+        +----------------+      |
|                                      |  | Backend Service|        |Frontend Service|      |
|                                      |  |  (Node.js)     |        |   (React)      |      |
|                                      |  +-------+--------+        +----------------+      |
|                                      |          |                         |               |
|                                      |  +-------v--------+        +-------v--------+      |
|                                      |  |  Backend Pod   |        |  Frontend Pod  |      |
|                                      |  |  (ExpressJS)   |        |    (Nginx)     |      |
|                                      |  +----------------+        +----------------+      |
|                                      |          |                                         |
|                                      |  +-------v--------------+                          |
|                                      |  |    MongoDB Service   |                          |
|                                      |  +-------+--------------+                          |
|                                      |          |                                         |
|                                      |  +-------v---------------+                         |
|                                      |  |  MongoDB StatefulSet  |                         |
|                                      |  | (с Persistent Volume) |                         |
|                                      |  +-----------------------+                         |
|                                      |                                                    |
|  +--------------------------------------------------------------------------------------+ |
|  |                                   Мониторинг                                         | |
|  | +-----------------+  (scrape metrics)  +------------------+  (visualize)   +---------+||
|  | |   Prometheus    | <------------------|   K8s, Nginx,    | --------------> | Grafana ||
|  | +-----------------+                    | Backend, MongoDB |                 +---------+|
|  +--------------------------------------------------------------------------------------+ |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
---

### 2. Адаптация Компонентов Приложения

#### 2.1. Frontend (React / TypeScript)
*   **Технология:** React, TS, Redux, RTK Query, SCSS.
*   **Сборка и развертывание:** Здесь ничего не меняется по сравнению с предыдущим планом. Это идеальный способ деплоя любого SPA (Single Page Application).
    1.  Собираем проект в статические файлы: `npm run build`.
    2.  Создаем **Dockerfile**, который копирует папку `build` в легковесный веб-сервер **Nginx**.
        dockerfile
        # Шаг 1: Сборка
        FROM node:18-alpine as builder
        WORKDIR /app
        COPY package*.json ./
        RUN npm install
        COPY . .
        RUN npm run build

        # Шаг 2: Запуск
        FROM nginx:1.23-alpine
        COPY --from=builder /app/build /usr/share/nginx/html
        # Опционально: скопировать свой nginx.conf для правильной работы роутинга React
        COPY nginx.conf /etc/nginx/conf.d/default.conf 
        EXPOSE 80
        CMD ["nginx", "-g", "daemon off;"]
        
    3.  Образ пушится в Container Registry (ECR, GCR, DockerHub).

#### 2.2. Backend (Node.js / ExpressJS)
*   **Технология:** Node.js, Express.js.
*   **Сборка и развертывание:**
    1.  Создаем **Dockerfile**. Важно использовать `alpine`-версию Node для уменьшения размера образа.
        dockerfile
        FROM node:18-alpine
        WORKDIR /usr/src/app
        
        COPY package*.json ./
        # Устанавливаем только production-зависимости
        RUN npm install --only=production
        
        COPY . .
        
        EXPOSE 3000 # или порт, который слушает ваше приложение
        
        CMD [ "node", "server.js" ] # или "npm", "start"
        
    2.  Образ пушится в Container Registry.
*   **Интеграция с Prometheus:** Это важный шаг для мониторинга.
    *   Добавьте в ваш Express-проект библиотеку `prom-client`.
    *   Создайте эндпоинт `/metrics`, который будет отдавать метрики Prometheus.
        javascript
        const express = require('express');
        const client = require('prom-client');
        const app = express();

        // Создаем регистр метрик
        const register = new client.Registry();
        client.collectDefaultMetrics({ register }); // Собираем дефолтные метрики Node.js (CPU, memory, etc.)

        // ... ваш основной код приложения ...

        // Эндпоинт для метрик
        app.get('/metrics', async (req, res) => {
            res.set('Content-Type', register.contentType);
            res.end(await register.metrics());
        });
        `

#### 2.3. База данных (MongoDB)
*   Технология: MongoDB.
*   Развертывание в Kubernetes:
    *   Как и в случае с PostgreSQL, для stateful-приложений, таких как БД, идеально подходит StatefulSet. Он гарантирует стабильное имя хоста и постоянное хранилище.
    *   Используем официальный образ mongo из Docker Hub.
    *   Данные будут храниться на PersistentVolume (PV) через PersistentVolumeClaim (PVC).
    *   Конфигурация (например
, MONGO_INITDB_ROOT_USERNAME) хранится в ConfigMap.
    *   Пароль (MONGO_INITDB_ROOT_PASSWORD) хранится в Secret.
    *   Важно: В вашем Backend-приложении строка подключения к MongoDB должна браться из переменных окружения, которые в K8s будут подставлены из Secret. Например, MONGODB_URI=mongodb://user:password@mongodb-service:27017/finance-app.
*   Альтернатива (Helm): Для упрощения можно использовать готовый Helm-чарт от Bitnami (bitnami/mongodb). Он уже содержит в себе настроенные StatefulSet, Service, Secrets и т.д. Это хороший способ быстро развернуть MongoDB, но для учебных целей полезно написать манифесты вручную.

---

### 3. Задачи для DevOps-инструментов (с адаптацией)

*   Terraform: Задача не меняется. Создать K8s кластер и сопутствующие ресурсы.

*   Kubernetes: Набор манифестов будет немного отличаться.
    *   Deployment для Frontend (образ с React+Nginx).
    *   Deployment для Backend (образ с Node.js/Express).
    *   StatefulSet для MongoDB.
    *   Service для каждого из трех компонентов.
    *   Ingress с теми же правилами маршрутизации.
    *   Secret для хранения MONGO_INITDB_ROOT_PASSWORD и полной строки подключения MONGODB_URI. Это очень важно, чтобы ваш бэкенд мог подключиться к БД.
    *   ConfigMap для нечувствительных настроек MongoDB.

*   Ansible: План действий почти не меняется.
    1.  Установить Nginx Ingress Controller (через Helm).
    2.  Установить kube-prometheus-stack (через Helm).
    3.  Создать namespace.
    4.  Создать Secret с кредами от MongoDB.
    5.  С помощью k8s-модуля применить все YAML-манифесты вашего приложения (Frontend, Backend, MongoDB).

*   Prometheus & Grafana:
    *   Prometheus: Нужно будет настроить его так, чтобы он "скрейпил" (собирал) метрики с эндпоинта /metrics вашего Backend-сервиса. Если вы используете kube-prometheus-stack, это делается созданием ServiceMonitor CRD, который указывает на ваш Backend Service.
    *   Grafana: Цели те же.
        1.  Использовать готовые дашборды для Kubernetes и Nginx Ingress.
        2.  Создать кастомный дашборд для вашего Node.js приложения. Метрики для отслеживания:
            *   Задержка event loop'a (ключевой показатель "здоровья" Node.js-приложения).
            *   Использование Heap Memory и частота сборок мусора (GC).
            *   Количество активных хэндлов.
            *   RPS, latency и количество ошибок API (HTTP 5xx, 4xx).
            *   Есть готовые дашборды для Node.js, которые можно импортировать и адаптировать.

---

### 4. Обновленный пошаговый план работы

1.  Подготовка приложения:
    *   Убедитесь, что ваше MERN-приложение полностью настраивается через переменные окружения (порт, строка подключения к MongoDB).
    *   Добавьте в Backend эндпоинт /metrics с помощью prom-client.
2.  Контейнеризация: Написать Dockerfile для Frontend (React+Nginx) и Backend (Node.js). Собрать образы и загрузить в ваш Container Registry.
3.  Инфраструктура (Terraform): Написать и применить terraform-код для создания K8s кластера.
4.  Манифесты (Kubernetes): Написать YAML-файлы: deployment-frontend.yaml, deployment-backend.yaml, statefulset-mongodb.yaml, service-all.yaml, ingress.yaml, secret.yaml.
5.  Автоматизация (Ansible): Создать Ansible-плейбук, который выполнит полную настройку кластера и развертывание вашего MERN-приложения.
6.  DNS и Тестирование: Настроить DNS и проверить работоспособность всего приложения.
7.  Мониторинг (Grafana): Зайти в Grafana, импортировать дашборды и создать свой собственный для Node.js.


