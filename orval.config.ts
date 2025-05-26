const swaggerApiUrl = "https://everforest-backend.zeabur.app/swagger.json";
const doc =  {
  Auth: {
    input: {
      target: swaggerApiUrl,
      filters: {
        mode: "include",
        tags: ["Auth 會員認證"],
      },
    },
    output: {
      target: "./types/services/Auth/index.ts",
    },
    client: null,
  },
  Event: {
    input: {
      target: swaggerApiUrl,
      filters: {
        mode: "include",
        tags: ["Events"],
      },
    },
    output: {
      target: "./types/services/Event/index.ts",
    },
    client: null,
  },
  Host: {
    input: {
      target: swaggerApiUrl,
      filters: {
        mode: "include",
        tags: ["Host 主辦方控制台"],
      },
    },
    output: {
      target: "./types/services/Host/index.ts",
    },
    client: null,
  },
  Member: {
    input: {
      target: swaggerApiUrl,
      filters: {
        mode: "include",
        tags: ["Member 會員中心"],
      },
    },
    output: {
      target: "./types/services/Member/index.ts",
    },
    client: null,
  },
  EventTags: {
    input: {
      target: swaggerApiUrl,
      filters: {
        mode: "include",
        tags: ["EventTags"],
      },
    },
    output: {
      target: "./types/services/EventTags/index.ts",
    },
    client: null,
  },
  Orders: {
    input: {
      target: swaggerApiUrl,
      filters: {
        mode: "include",
        tags: ["Orders"],
      },
    },
    output: {
      target: "./types/services/Orders/index.ts",
    },
    client: null,
  },
};

export default doc