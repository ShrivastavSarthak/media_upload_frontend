export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export enum ApiMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export enum LoginApiUrls {
  SignIn = "/api/v1/auth/signin",
  SignUp = "/api/v1/auth/signup",
  getUser = "/api/v1/auth/user/{0}",
}

export enum mediaApiUrl {
  uploadMedia = "/api/v1/media/post",
  deleteMedia = "/api/v1/media/{0}",
  updateMedia = "/api/v1/media/{0}",
  getMediaById = "/api/v1/media/{0}",
  getAllMedia = "/api/v1/media/user/{0}",
}
