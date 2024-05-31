import exp from "constants";
import { WickedCoolList } from "./WickedCoolList";

describe("a wicked cool list", () => {

    test('can get second to last string in simple case', () => {
        const wickedCoolList = new WickedCoolList(["Gnu", "Lion", "Zebra", "Gazelle"]);
        const secondLargest = wickedCoolList.getSecondBiggestElement();
        expect(secondLargest).toEqual("Lion");
    })


    test('returns only item in array', () => {
        const wickedCoolList = new WickedCoolList(['One'])
        const secondLargest = wickedCoolList.getSecondBiggestElement()
        expect(secondLargest).toEqual('One')
    })

    test('returns second largest number in array (works with number)', () => {
        const wickedCoolList = new WickedCoolList([1, 2, 3, 5, 9, 10])
        const secondLargest = wickedCoolList.getSecondBiggestElement()
        expect(secondLargest).toEqual(9)
    })

    test('throws error when list is empty', () => {
        const wickedCoolList = new WickedCoolList([])
        expect(() => {wickedCoolList.getSecondBiggestElement()}).toThrow(Error)
    })

    test('returns second largest object from mixed list', () => {
        const wickedCoolList = new WickedCoolList([1, 'One', 3, 'a', 9, '100000'])
        const secondLargest = wickedCoolList.getSecondBiggestElement()
        expect(secondLargest).toEqual(9)
    })
})