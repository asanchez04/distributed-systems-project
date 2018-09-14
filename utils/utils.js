'use strict'

const find_duplicate_in_array = (array) => {

  let flag = false

  for (let i = 0; i < array.length; i++) {

    for (let j = (i + 1); j < array.length; j++) {
      if (array[i].productId == array[j].productId) {
        flag = true
      }
    }

  }

  return flag

}

export default {
  find_duplicate_in_array
}