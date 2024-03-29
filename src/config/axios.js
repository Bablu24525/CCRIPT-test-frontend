import axios from "axios";
import nookies, { parseCookies, setCookie, destroyCookie } from "nookies";

const base_url = "https://ccript-test.vercel.app";


// access api without token 
export const PublicInstance = axios.create({
    baseURL: base_url
});




// access api with token
export const PrivateInstance = axios.create({
    baseURL: base_url
});

PrivateInstance.interceptors.request.use(
    function (config) {
        // Getting User Token
        let cookies = parseCookies();
        const userToken = cookies[`access_token`];
        const refreshToken = cookies[`refresh_token`];

        if (!!userToken) {
            config.headers["Authorization"] = `Bearer ${userToken}`;
        }
        return config;
    },
    function (error) {
        // console.log("Error: ", error);
        // if (error.response.data.success === false) {
        //     generateNewToken(error.config);
        // }
    }
)

PrivateInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.data.success === false) {
            // console.log("Response Error: ", error);
            generateNewToken(error.config);
        }
        return error;
    }
)

const generateNewToken = async (originalRequest) => {
    let cookies = parseCookies();
    const refreshToken = cookies[`refresh_token`];
    try {
        const res = await PublicInstance({
            url: "/auth/get-token",
            method: "GET",
            headers: {
                "Authorization": `Bearer ${refreshToken}`
            }
        });
        if (res.data.success) {
            nookies.set(null, "access_token", res.data.access_token, { path: "/" });
            originalRequest.headers["Authorization"] = `${res.data.access_token}`;
            return Promise.resolve();
        } else {
            nookies.destroy(null, "access_token", { path: "/" });
            nookies.destroy(null, "refresh_token", { path: "/" });
            window.location.replace("/login");
            return Promise.reject(new Error("Token refresh failed."));
        }
        console.log("generating refresh token:", refreshToken);
    } catch (refreshError) {
        console.error("Token refresh error:", refreshError);
        nookies.destroy(null, "access_token", { path: "/" });
        nookies.destroy(null, "refresh_token", { path: "/" });
        window.location.replace("/login");
    }
};


// const generateNewToken = async (originalRequest) => {
//     let cookies = parseCookies();
//     const refreshToken = cookies[`refresh_token`];
//     let res = await PublicInstance({
//         url: "/auth/get-token",
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${refreshToken}`
//         }
//     });
//     console.log("generating refresh token : ", refreshToken);
//     if (res?.data?.success) {
//         nookies.set(null, "access_token", res.data.access_token, { path: "/" });
//         originalRequest.headers["Authorization"] = `${res.data.access_token}`;
//         await authFetch(originalRequest);
//     } else {
//         nookies.destroy(null, "access_token", { path: "/" });
//         nookies.destroy(null, "refresh_token", { path: "/" });
//         window.location.replace = "/login";
//     }
// }