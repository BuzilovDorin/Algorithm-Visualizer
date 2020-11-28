$(document).ready(function(){
    // Generate Grid on page load
    generateGrid(41, 75);
    // Set start & end nodes on page load
    $('#20-10').toggleClass('unvisited start-node').attr('tooltip', 'Row: 20, Column: 10');
    $('#20-60').toggleClass('unvisited end-node').attr('tooltip', 'Row: 20, Column: 60');  
    // Toggle navbar drop down menus
    $(document).click(function(e){
        $('.dropdown').remove();
        $('.button-down').toggleClass("button-down button");
        if ($('.dropdown').length == 0){
            $('.button').click(function(event){
                $('.dropdown').remove();
                $('.button-down').toggleClass("button-down button");
                if (!$(event.target).attr("id")) {
                    var dropdown_options = $(event.target).attr('dropdown-field');
                    var offest_origin = $(event.target).offset()
                    $(event.target).toggleClass("button button-down");
                    $("#body").append("<div class='dropdown'>" + dropdown_options + "</div>");
                    $('.dropdown').css({left: offest_origin.left , top: offest_origin.top + 65})
                    return false
                }
            })  
        }
    })

    // Choosing Algorithim
    $(document).click(function(e){
        if ($(e.target).attr("class") == "Dijkstra"){
            $("#algorithim-descript").empty();
            $("#algorithim-descript").append("Dijkstra's Algorithim <br></br><div class='subtext'>Assign all nodes on the grid a distance value of infinity[∞]; in relation to the start node. Assign the start node a distance value of [0]. Dijkstra's algorithm will begin by visiting the start node. Dijkstra's goal is to measure the current node's distance from the start, then update all the neighbouring nodes (Nodes: up, right, left, down) a distance value of [+1]. Pick the node with the smallest distance value to traverse next. Like you did before update its distance value and the neighbours values too. Then find the next node with the smallest distance value and traverse it. Keep repeating until you reach the end goal. <br></br></div> <div class='subtextExample'>Example: Calculating the best route through a city would be one application of Dijkstra's algorithm. Areas of high traffic can be weighted to avoid taking certain routes.</div> <button id='example_button_weighted' class='dijkstra_weighted_example'> Weighted example </button> <button id='example_button_unweighted' class='dijkstra_unweighted_example'> Unweighted example </button>");
            $("#algorithim-descript").css ( 'color', "black" )
            return false;
        }
    })

    // Create and remove walls with mousemove
    mouseDrag = false;
    currentCell = null;
    heart = null;
    weight = null;
    // document.onkeypress = function(e) {
    //     if (e.key == "w" & e.key == "t"){
    //         alert("true")
    //         weight = true;
    //     }
    // };
    // $(document).on('keyup', function() {
    // })
    // document.onkeyrelease = function(e) {
    //     heart = null;
    //     weight = null;
    // };

    var pressedKeys = {};

    function checkPressedKeys() {
        var shiftPressed=false, ctrlPressed=false, aPressed=false;
        for (var i in pressedKeys) {
            if (!pressedKeys.hasOwnProperty(i)) continue;
            if(i==16){
                shiftPressed=true;
            }
            else if(i==87){
                aPressed=true;
            }
        }
        if(shiftPressed & aPressed){
            console("works")
        }
    }


    $(document).ready(function(){
        $(document).keydown(function (e) {
            pressedKeys[e.which] = true;
            checkPressedKeys();
        });

        $(document).keyup(function (e) {
            delete pressedKeys[e.which];
        });
    });
    $(document)
    .mousedown(function(e) {
        // If shift key is pressed && W || H then...
        if (e.shiftKey && weight == true){
            if (!$(e.target).is("td")){
                return false;
            }
            else {
                $(e.target).removeClass();
                $(e.target).addClass("weight-node");
                return false;
            }
        }
        // Create Wall
        else if ($(e.target).is("td") & !$(e.target).is(".start-node") & !$(e.target).is(".end-node")) {
            $(e.target).removeClass();
            $(e.target).addClass("wall");
            currentCell = $(e.target).attr("id")
            mouseDrag = true
        }
    })
    .mousemove(function(e) {
        e.preventDefault()
        if(mouseDrag ==  true) {
            if ($(e.target).attr("id") != currentCell){
                if ($(e.target).is(".unvisited , .wall")) {
                    $(e.target).removeClass();
                    $(e.target).addClass("unvisisted");
                    currentCell = $(e.target).attr("id")
                }
            }
        }
    })
    .mouseup(function(e) {
        mouseDrag = false
        currentCell = null
        return false;
    })

    // Clear whole board
    $(".button-1-click").click(function(e){
        $('.wall').toggleClass(("unvisited wall"))
    })

    // Let tooltip follow cursor when hovering over icon
    $('[tooltip]').mousemove(function(event){
    var tooltip_text = $(event.target).attr('tooltip');
        if ($(".tooltip").length <= 0) {
            $("#body").append("<div class='tooltip'>" + tooltip_text + "</div>");
                var top_pos = event.pageY
                var x_pos = event.pageX
                $('.tooltip').css({left: x_pos, top: top_pos})
        }
        else {
            $(".tooltip").remove(); 
            $("#body").append("<div class='tooltip'>" + tooltip_text + "</div>");{
                var top_pos = event.pageY
                var x_pos = event.pageX
                $('.tooltip').css({left: x_pos, top: top_pos})
            }
        }
    })
    $('[tooltip]').mouseleave(function(){
        $(".tooltip").remove();
    })
});

function generateGrid(gHeight, gWidth) {
    // Create Grid Based on input
    MakeRows(gHeight)
    makeColumns(gWidth)
}

function MakeRows(rowNum) {
    // create Rows
    var grid = document.getElementById('grid');
    for (r = 0; r < rowNum; r++) {
        var row = document.createElement("tr");
        grid.appendChild(row).setAttribute('id', 'row ' + r);
    }
}

function makeColumns(colNum){
    // create Columns
    var grid = document.getElementById('grid').children;
    for (r=0; r < grid.length; r++){
        for (c = 0; c < colNum; c++){
            var newCol = document.createElement('td');
            newCol.id = r + "-" + c;
            newCol.className = "unvisited";
            // newCol.className = string("Row: " + r , "Column: " + c);
            grid[r].appendChild(newCol);
        }
    }
}