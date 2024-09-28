import jwt from "jsonwebtoken";

export const generetRefressToken = (data: any) => {
  const RefressToken = jwt.sign(data, process.env.TOKEN_PRIVET_KEY!, {
    expiresIn: "1y",
  });
  return RefressToken;
};
export const generetAccessToken = (data: any) => {
  const AccessToken = jwt.sign(data, process.env.TOKEN_PUBLIC_KEY!, {
    expiresIn: "1y",
  });
  return AccessToken;
};

export const varifierAccessToken = (token: any) => {
  try {
    const data = jwt.verify(
      token,
      process.env.TOKEN_PUBLIC_KEY!,
      function (err: any, decoded: any) {
        if (err) {
          return "AccessTokenexpired";
        }
    
        return decoded;
      }
    );
    return data;
  } catch (e: any) {
    console.log("this is in access token ", e);
  }
};
export const varifierRefressToken = (cookie: any) => {
  try {


    const data = jwt.verify(cookie, process.env.TOKEN_PRIVET_KEY!);
    return data;
  } catch (e: any) {
    console.log("this is in Refress token ", e);
  }
};
