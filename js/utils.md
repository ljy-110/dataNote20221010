常用封装js方法

```js
/**
 * 将字符串根据某个符号分割成数组
 * @param {string} str - 待分割的字符串
 * @param {string} delimiter - 分隔符
 * @returns {Array} - 分割后的数组
 */
export function splitString(str, delimiter) {
  return str.split(delimiter).filter(item => item.trim() !== '');
}

/**
 * 数组根据下标值进行分割
 * @param {Array} arr - 待分割的数组
 * @param {Array<number>} indices - 分割的下标值
 * @returns {Array<Array>} - 分割后的数组
 */
export function splitArrayByIndices(arr, indices) {
  const result = [];
  let start = 0;

  indices.forEach((end) => {
    const chunk = arr.slice(start, end);
    result.push(chunk);
    start = end;
  });

  const remaining = arr.slice(start);
  if (remaining.length > 0) {
    result.push(remaining);
  }

  return result;
}

/**
 * 对象数组计算某个值的总数
 * @param {Array<Object>} arr - 对象数组
 * @param {string} key - 计算总和的键名
 * @returns {number} - 总数
 */
export function sumByKey(arr, key) {
  return arr.reduce((total, item) => total + (item[key] || 0), 0);
}

/**
 * 对象数组根据某个值进行升序降序处理
 * @param {Array<Object>} arr - 对象数组
 * @param {string} key - 排序的键名
 * @param {boolean} [ascending=true] - 是否升序，默认为升序
 * @returns {Array<Object>} - 排序后的数组
 */
export function sortArrayByKey(arr, key, ascending = true) {
  return arr.sort((a, b) => {
    if (ascending) {
      return a[key] - b[key];
    } else {
      return b[key] - a[key];
    }
  });
}

/**
 * 把对象数组里面的某个值用某个符号合并成一个字符串
 * @param {Array<Object>} arr - 对象数组
 * @param {string} key - 合并的键名
 * @param {string} delimiter - 分隔符
 * @returns {string} - 合并后的字符串
 */
export function joinArrayByKey(arr, key, delimiter) {
  return arr.map(item => item[key]).join(delimiter);
}

/**
 * 时间格式化方法
 * @param {Date|string|number} date - 待格式化的时间
 * @param {string} format - 格式字符串，例如 "yyyy-MM-dd"
 * @returns {string} - 格式化后的时间字符串
 */
export function formatDate(date, format) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return format.replace('yyyy', year)
               .replace('MM', month)
               .replace('dd', day)
               .replace('HH', hours)
               .replace('mm', minutes)
               .replace('ss', seconds);
}
```

