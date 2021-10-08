class testCell{
    constructor(i){
      this.f = i;
      this.getFValue = this.getFValue.bind(this);
    }

    getFValue(){
      return this.f;
    }
  }