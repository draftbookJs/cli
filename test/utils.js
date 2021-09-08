
const { QUESTIONS } = require('../constants')

function getAllPossibleAnsers () {
  const answerList = []
  const answer = { name: '' }
  let count = 0

  // 递归生成所有配置`的枚举
  function getAnswerRecursively (index) {
    // 边界
    if (!QUESTIONS[index]) {
      answer.name = `test-${++count}`
      answerList.push({ ...answer })
      return undefined
    }

    const {
      name, type, default: defaultVal, choices = [], when
    } = QUESTIONS[index]
    if (when && !when(answer)) {
      answer[name] = defaultVal
      getAnswerRecursively(index + 1)
      delete answer[name]
    } else if (name === 'name') {
      getAnswerRecursively(index + 1)
    } else if (type === 'list') {
      choices.forEach(item => {
        if (
          Object.prototype.toString.call(item) === '[object Object]' && item.value
        ) {
          answer[name] = item.value
          getAnswerRecursively(index + 1)
          delete answer[name]
        } else if (Object.prototype.toString.call(item) === '[object String]') {
          answer[name] = item
          getAnswerRecursively(index + 1)
          delete answer[name]
        }
      })
    } else if (type === 'confirm') {
      answer[name] = true
      getAnswerRecursively(index + 1)
      answer[name] = false
      getAnswerRecursively(index + 1)
      delete answer[name]
    } else {
      console.error('未覆盖的 type，请添加对应测试')
    }
    return false
  }

  getAnswerRecursively(0)
  return answerList
}

module.exports = {
  allPossibleAnsers: getAllPossibleAnsers()
}
