const swaggerApiUrl = "https://everforest-backend.zeabur.app/api-docs/swagger.json";

const doc =  {
  Auth: {
    input: {
      target: swaggerApiUrl,
      filters: {
        mode: "include",
        tags: ["Auth"],
      },
    },
    output: {
      target: "./src/types/services/Auth.ts",
    //   override: {
    //     mutator: {
    //       path: "./src/services/axiosInstance.ts", // ✅ 你自定義 axios wrapper 的路徑
    //       name: "customInstance",
    //     },
    //   },
    },
    client: "axios",
    headers: true,
  },
};

export default doc