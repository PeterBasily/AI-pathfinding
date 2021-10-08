class test{
    constructor(selectorFunction){
        this.selectorFunction = selectorFunction;
        this.items = [];
    }

    insert = (testCell) => {
        this.items.push(testCell);
    }

    evaluate = () => {
        console.log(this.items[0].selectorFunction());
    }
}