const OSS = require('ali-oss');
const client = new OSS({
  region: 'oss-cn-beijing',
  accessKeyId: 'LTAIjY0NjBpEkpUR',
  accessKeySecret: 'hcbqkZADWy0GflyVMsHoXPiRtL6nIM',
  bucket: 'xwjshopdev',
  endpoint: 'oss-cn-beijing.aliyuncs.com'
});
export default client;