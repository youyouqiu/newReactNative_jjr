/**
 * 定义所有的api请求的来源
 */
export default {
    local: { // 本地地址
        auth: 'http://192.168.100.161:5000',
        api: 'http://192.168.100.161:7000',
        upload: 'http://192.168.100.159:5100',
        public: 'http://192.168.100.161:7001',
        buryPoint: 'http://bp.puzhentan.com/test',
    },
    localTesst: { // 本地测试地址
        auth: 'http://rd.xinkongjian.tech:5000',
        api: 'http://rd.xinkongjian.tech:7000',
        upload: 'http://192.168.100.159:5100',
        public: 'http://rd.xinkongjian.tech:7001',
        buryPoint: 'http://bp.puzhentan.com/test',
    },
    test: { // 测试地址
        auth: 'https://testjjrauth.puzhentan.com',
        api: 'https://testjjrapi.puzhentan.com',
        upload: 'https://testfile.puzhentan.com',
        public: 'https://testptapi.puzhentan.com',
        buryPoint: 'http://bp.puzhentan.com/test',
    },
    production: { // 正式地址
        auth: 'https://jjrauth.puzhentan.com',
        api: 'https://jjrapi.puzhentan.com',
        upload: 'https://file.puzhentan.com',
        public: 'https://ptapi.puzhentan.com',
        buryPoint:'http://bp.puzhentan.com/prod'
    }
}