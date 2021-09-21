
let type =100
let element  = 100

export function findElement(boxes) {

    
    

    // Array with winning combinations
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    // Iterate over array with winning combinations
    for (let i = 0; i < rows.length; i++) {
        const [a, b, c] = rows[i]

        // Check if the game board contains winning combination

        //once you change this to an object you'll have to do a.name/ a.picture
        

        if (boxes[a].element && boxes[a].element === boxes[b].element && boxes[a].element === boxes[c].element) {
            // Return the winner ('x' or 'o')
            element += 10;
            
            return boxes[a].element +" "+ element+"%"
        }
    }

    // Otherwise do nothing
    return null
}

export function findType(boxes) {
    

    // Array with bingo combinations
    const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    

    // Iterate over array with bingo combinations
    
    for (let i = 0; i < rows.length; i++) {
        const [a, b, c] = rows[i]

        // Check if the game board contains bingo combination        

        if (boxes[a].type && boxes[a].type === boxes[b].type && boxes[a].type === boxes[c].type) {
            // Return the bingo and bonus
            type += 10;
            
        
            return boxes[a].type +" "+ type+"%"
        }
        }
    

    // Otherwise do nothing
    return null
}

export function areAllBoxesClicked(boxes) {
    // Declare variable to store number of clicked boxes.
    let count = 0

    // Iterate over all boxes
    boxes.forEach(function (item) {
        // Check if box is clicked (not null)
        if (item.picture !== null) {
            // If yes, increase the value of count by 1
            count++
        }
    })

    // Check if all boxes are clicked (filled)
    if (count === 9) {
        return true
    } else {
        return false
    }
}