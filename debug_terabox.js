const TeraboxUploader = require('./lib/index');
const axios = require('axios');

class TeraboxExtended extends TeraboxUploader {
  constructor(credentials) {
    super(credentials);
  }

  // Metoda do zdalnego przesyłania (Remote Upload)
  async remoteUpload(url, savePath = '/') {
    try {
      const endpoint = 'https://www.1024terabox.com/rest/2.0/cms/transfer';
      const params = {
        method: 'add_task',
        app_id: this.credentials.appId,
        jsToken: this.credentials.jsToken,
        'dp-logid': this.credentials.dpLogId
      };
      
      const data = new URLSearchParams();
      data.append('url', url);
      data.append('save_path', savePath);

      const response = await axios.post(endpoint, data.toString(), {
        params,
        headers: {
          'Cookie': this.credentials.cookies,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  // Metoda do listowania zadań zdalnego przesyłania
  async listRemoteTasks() {
    try {
      const endpoint = 'https://www.1024terabox.com/rest/2.0/cms/transfer';
      const params = {
        method: 'list_task',
        app_id: this.credentials.appId,
        jsToken: this.credentials.jsToken,
        'dp-logid': this.credentials.dpLogId
      };

      const response = await axios.get(endpoint, {
        params,
        headers: { 'Cookie': this.credentials.cookies }
      });
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }

  // Metoda do usuwania zadań (z poprawionymi nagłówkami)
  async clearRemoteTasks(taskIds) {
    try {
      const endpoint = 'https://www.1024terabox.com/rest/2.0/cms/transfer';
      const params = {
        method: 'clear_task',
        app_id: this.credentials.appId,
        jsToken: this.credentials.jsToken,
        'dp-logid': this.credentials.dpLogId
      };

      const data = new URLSearchParams();
      data.append('task_ids', taskIds.join(','));

      const response = await axios.post(endpoint, data.toString(), {
        params,
        headers: {
          'Cookie': this.credentials.cookies,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data;
    } catch (error) {
      return { success: false, error: error.response?.data || error.message };
    }
  }
}

// Symulacja testu z błędnymi danymi, aby sprawdzić format błędów
async function testFormat() {
  const tester = new TeraboxExtended({
    ndus: 'test_ndus',
    appId: '250528',
    jsToken: 'test_token'
  });

  console.log("--- Testing Remote Upload Format ---");
  const res = await tester.remoteUpload('http://example.com/file.zip');
  console.log(JSON.stringify(res, null, 2));

  console.log("\n--- Testing List Tasks Format ---");
  const list = await tester.listRemoteTasks();
  console.log(JSON.stringify(list, null, 2));
}

testFormat();
