// test.js
const { JSDOM } = require('jsdom');

// 创建一个虚拟的 DOM 环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// 导入你的插件文件
require('./ip_opener.js');

// 接下来你可以开始编写测试用例
// ...

const { isValidIPAddress, isValidHostname, isDigit } = require('./ip_opener.js');

describe('isValidIPAddress', () => {
    it('should validate correct IP addresses', () => {
        expect(isValidIPAddress('10.232.1.2')).toBe(true);
        expect(isValidIPAddress('10.232.255.255')).toBe(true);
        expect(isValidIPAddress('255.255.255.255')).toBe(true);
    });

    it('should validate partial IP addresses', () => {
        expect(isValidIPAddress('1')).toBe(false);
        expect(isValidIPAddress('1.2')).toBe(false);
        expect(isValidIPAddress('1.2.3')).toBe(false);
        expect(isValidIPAddress('1.2.3.4')).toBe(true);
    });

    it('should not validate incorrect IP addresses', () => {
        expect(isValidIPAddress('10.232.1.256')).toBe(false);
        expect(isValidIPAddress('10.232.1.')).toBe(false);
        expect(isValidIPAddress('10.232.1.a')).toBe(false);
        expect(isValidIPAddress('10.232.1.')).toBe(false);
    });

    it('should validate partial IP addresses with prefix', () => {
        const base_ip_prefix = '10.232';
        expect(isValidIPAddress('1', base_ip_prefix)).toBe(true);
        expect(isValidIPAddress('1.2', base_ip_prefix)).toBe(true);
        expect(isValidIPAddress('1.2.3', base_ip_prefix)).toBe(true);
    });
});

describe('isValidHostname', () => {
    it('should validate correct hostnames', () => {
        expect(isValidHostname('example.com')).toBe(true);
        expect(isValidHostname('www.example.com')).toBe(true);
        expect(isValidHostname('example-123')).toBe(true);
    });

    it('should not validate incorrect hostnames', () => {
        expect(isValidHostname('example.com-')).toBe(false);
        expect(isValidHostname('-example.com')).toBe(false);
        expect(isValidHostname('example..com')).toBe(false);
    });
});

describe('isDigit', () => {
    it('should validate digits', () => {
        expect(isDigit('0')).toBe(true);
        expect(isDigit('9')).toBe(true);
    });

    it('should not validate non-digits', () => {
        expect(isDigit('a')).toBe(false);
        expect(isDigit(' ')).toBe(false);
    });
});