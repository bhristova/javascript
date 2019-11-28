function jumpingJimmy(tower, jumpHeight) {
    return tower.slice(0,(tower
                   .findIndex(a => a>jumpHeight) == -1 ? tower.length : tower.findIndex(a => a>jumpHeight)))
        .reduce((sum, el) => {return el <= jumpHeight ? (sum + el) : sum;}, 0)

}
