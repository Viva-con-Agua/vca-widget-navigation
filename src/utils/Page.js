export default class Page {

  constructor(numberOfItems, offset = 0, size = 20, maxElements = 40, currentSize = 20) {
    this.numberOfItems = numberOfItems;
    this.offset = offset;
    this.size = size;
    this.currentSize = currentSize;
    this.maxElements = maxElements;
  }

  static apply(numberOfItems) {
    return new Page(numberOfItems, 0, 20, 40, 20)
  }

  getCopy(newOffset, newCurrentSize) {
    return new Page(this.numberOfItems, newOffset, this.size, this.maxElements, newCurrentSize)
  }

  getOffset() {
    return this.offset;
  }

  getSize() {
    return this.currentSize;
  }

  next() {
    var newPage = this;
    if(this.currentSize < this.maxElements) {
      var newCurrentSize = this.currentSize + this.size;
      newPage = this.getCopy(this.offset, newCurrentSize)
    } else {
      var newOffset = this.offset + this.size;
      if (newOffset + this.currentSize > this.numberOfItems) {
        newOffset = this.numberOfItems - this.currentSize;
      }
      newPage = this.getCopy(newOffset, this.currentSize)
    }
    return newPage;
  }

  previous() {
    var newOffset = this.offset - this.size;
    if (newOffset < 0) {
      newOffset = 0
    }
    return this.getCopy(newOffset, this.currentSize);
  }

  hasPrevious() {
    return this.offset !== 0;
  }

  hasNext() {
    return (this.offset + this.currentSize) < this.numberOfItems;
  }

  howManyNext() {
    return this.numberOfItems - (this.offset + this.currentSize);
  }

  howManyPrevious() {
    return this.offset;
  }
}
