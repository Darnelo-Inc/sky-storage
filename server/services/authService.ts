import bcryptjs from "bcryptjs"
import { Secret, sign } from "jsonwebtoken"
import { IUserData } from "../models/AuthService"
import User from "../models/User"
import { ObjectId } from "mongoose"

const secretKey = process.env.secretKey as Secret

class AuthService {
  async findUserByEmail(email: string) {
    const user = await User.findOne({ email })
    return user
  }

  createAccessToken(_id: ObjectId) {
    return sign({ id: _id }, secretKey, {
      expiresIn: "1h",
    })
  }

  async signUp({ email, password }: IUserData) {
    const isUserExists = await this.findUserByEmail(email)
    if (isUserExists) {
      return { error: "User with this email already exists" }
    }

    const hashedPassword = await bcryptjs.hash(password, 5)

    const user = new User({ email, password: hashedPassword })
    await user.save()

    const token = this.createAccessToken(user._id)

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        disk_space: user.disk_space,
        used_space: user.used_space,
        avatar: user.avatar,
      },
    }
  }

  async signIn({ email, password }: IUserData) {
    const user = await this.findUserByEmail(email)
    if (!user) {
      return { error: "Invalid username or password" }
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password)

    if (!isPasswordValid) {
      return { error: "Invalid username or password" }
    }

    const token = this.createAccessToken(user._id)

    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        disk_space: user.disk_space,
        used_space: user.used_space,
        avatar: user.avatar,
      },
    }
  }

  async auth(_id: ObjectId) {
    const user = await User.findById(_id)

    if (!user) {
      return { error: "User not found" }
    }

    const token = this.createAccessToken(user._id)

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        disk_space: user.disk_space,
        used_space: user.used_space,
        avatar: user.avatar,
      },
    }
  }
}

export default new AuthService()
