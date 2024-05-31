
export class WickedCoolList<T> {
    innerList:[T]; 

    constructor(listElems: [T]) {
        this.innerList = listElems
    }

    getSecondBiggestElement() : T {
        let biggest
        let secondBiggest

        if (this.innerList.length < 1) {
            throw new Error('Empty list cannot be used')
        }

        this.innerList.forEach((el) => {
            if (!biggest) {
                biggest = el
                secondBiggest = el
            } else if (el > biggest) {
                if (biggest !== undefined || biggest !== null) {
                    secondBiggest = biggest
                }
                biggest = el
            } else if (el > secondBiggest) {
                secondBiggest = el
            }
        })
        return secondBiggest
    }
  }
