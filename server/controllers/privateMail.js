const BaseAPI = require('../baseAPI.js');
const settings = require('../../settings');

class PrivateMailController extends BaseAPI {
  constructor(apiConfig) {
    super(apiConfig);
    this.appHost = settings.app.appHost;
    this.endpoints = settings.endpoints;
  }

  async getInbox(page = 1) {
    return this.get(this.endpoints.inbox, {
      params: { page, is_star: 0, is_unread: 0, is_information: 0 },
    });
  }

  async getMailDetail(mailId) {
    return this.get(`${this.endpoints.mail}/${mailId}`, {
      baseURL: this.appHost,
    });
  }

  async getProfile() {
    return this.get(this.endpoints.users);
  }

  async getMenu() {
    return this.get(this.endpoints.menu);
  }

  async downloadImage(imageUrl) {
    const response = await this.get(imageUrl, {
      responseType: 'arraybuffer',
    });

    const result = { contentType: response.headers['content-type'] };

    if (!response.error) {
      const base64String = Buffer.from(response.data).toString('base64');
      result.rawBase64String = base64String;
      result.base64String = `data:'${response.headers['content-type']}';base64,${base64String}`;
    } else {
      result.base64String = '';
    }

    return result;
  }
}

module.exports = PrivateMailController;
