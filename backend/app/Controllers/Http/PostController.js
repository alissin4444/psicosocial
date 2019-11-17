'use strict'

const Post = use("App/Models/Post")

class PostController {

  async index () {
    const posts = await Post.all()

    return posts
  }

  async store ({ request }) {
    const data = request.only(['content'])
    const post = await Post.create(data)

    return post
  }

  async show ({ params }) {
    const post = await Post.find(params.id)

    return post
  }

  async update ({ params, request }) {
    const data = request.only(["content"])
    const post = Post.find(params.id)

    post.merge(data)

    await post.save()

    return post
  }

  async destroy ({ params }) {
    const post = await Post.find(params.id)

    await post.delete()
  }
}

module.exports = PostController
