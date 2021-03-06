namespace User {
  const explain = require("explain");
  const userService = require("../service/user");
  // 工具函数
  const { appErrorMessage, handleMustRequireParam } = require("app-tools");
  module.exports = class User extends explain.service {
    async hanlder(methodName: string, urlParams?: any) {
      const service = new userService({
        userID: this.context.userID,
        context: this.context,
        token: this.event.uniIdToken,
      });
      return await service[methodName](this.event.params, urlParams);
    }
    // 微信登录
    async loginByWechat(urlParams) {
      return await this.hanlder("loginByWechat", urlParams);
    }
    // 微信绑定
    async bindWechat() {
      return handleMustRequireParam(
        [
          {
            key: "code",
            value: "code码",
          },
          {
            key: "uid",
            value: "用户ID",
          },
        ],
        this.event.params
      )
        .then(async () => await this.hanlder("bindWechat"))
        .catch((err) => err);
    }
    // QQ登录
    async loginByQQ(urlParams) {
      return await this.hanlder("loginByQQ", urlParams);
    }
    // QQ绑定
    async bindQQ() {
      return handleMustRequireParam(
        [
          {
            key: "code",
            value: "code码",
          },
          {
            key: "uid",
            value: "用户ID",
          },
        ],
        this.event.params
      )
        .then(async () => await this.hanlder("bindQQ"))
        .catch((err) => err);
    }
    // 手机号验证码登录
    async loginBySms() {
      return handleMustRequireParam(
        [
          {
            key: "phone",
            value: "手机号",
          },
          {
            key: "code",
            value: "验证码",
          },
        ],
        this.event.params
      )
        .then(async () => await this.hanlder("loginBySms"))
        .catch((err) => err);
    }
    // 发送验证码
    async sendSms(urlParams) {
      return await this.hanlder("sendSms", urlParams);
    }
    // 绑定手机号
    async bindMobile() {
      return handleMustRequireParam(
        [
          {
            key: "uid",
            value: "用户ID",
          },
          {
            key: "mobile",
            value: "手机号",
          },
          {
            key: "code",
            value: "验证码",
          },
        ],
        this.event.params
      )
        .then(async () => await this.hanlder("bindMobile"))
        .catch((err) => err);
    }
    // 用户登出, 登出需要客户端删除持久性缓存
    async userLogout(urlParams) {
      return await this.hanlder("userLogout", urlParams);
    }

    // 校验Token是否有效
    async checkpToken(urlParams) {
      return await this.hanlder("checkToken", urlParams);
    }

    // 更新用户信息
    async updateUserInfo() {
      return handleMustRequireParam(
        [
          {
            key: "uid",
            value: "用户ID",
          },
          {
            key: "nickname",
            value: "昵称",
          },
          {
            key: "gender",
            value: "性别",
          },
          {
            key: "avatar",
            value: "头像",
          },
          {
            key: "sign",
            value: "签名",
          },
        ],
        this.event.params
      )
        .then(async () => {
          return await this.hanlder("updateUserInfo");
        })
        .catch((error) => error);
    }
    /**根据token获取用户信息(检查用户)
     * @doc https://uniapp.dcloud.io/uniCloud/uni-id?id=%e6%a0%b9%e6%8d%aetoken%e8%8e%b7%e5%8f%96%e7%94%a8%e6%88%b7%e4%bf%a1%e6%81%af
     */
    async getUserContentByToken() {
      return await this.hanlder("getUserContentByToken");
    }
    /**
     * 根据ID获取用户信息
     */
    async getUserContentByID(urlParams) {
      return await this.hanlder("getUserContentByID", urlParams);
    }
    /**
     * 检查用户关注状态，若已关注，则取消关注，若没关注，则直接关注
     * @author mrc
     */
    async checkFollowers() {
      return handleMustRequireParam(
        [
          {
            key: "follower",
            value: "关注ID",
          },
        ],
        this.event.params
      )
        .then(async () => {
          return await this.hanlder("checkFollowers");
        })
        .catch((err) => err);
    }
    async resetPassword() {
      return handleMustRequireParam(
        [
          {
            key: "id",
            value: "用户ID"
          },
          {
            key: "password",
            value: "重置后的密码",
          },
        ],
        this.event.params
      )
        .then(async () => {
          return await this.hanlder("resetPassword");
        })
        .catch((error) => error);
    }
  };
}
