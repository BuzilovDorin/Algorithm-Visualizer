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
            $("#algorithim-descript").append("Dijkstra's Algorithim <br></br><div class='subtext'>This is the description of the algorithim</div> <br></br> <div class='subtextExample'>Example: A real world example or use case is given in this section</div>");
            $("#algorithim-descript").css ( 'color', "rgb(31, 54, 83)" )
        }
    })

    // Create and remove walls with mousemove
    mouseDrag = false;
    currentCell = null;
    $(document)
    .mousedown(function(e) {
        if ($(e.target).is(".unvisited , .wall")) {
            $(e.target).toggleClass("unvisited wall")
            currentCell = $(e.target).attr("id")
            mouseDrag = true
        }
    })
    .mousemove(function(e) {
        e.preventDefault()
        if(mouseDrag ==  true) {
            if ($(e.target).attr("id") != currentCell){
                if ($(e.target).is(".unvisited , .wall")) {
                    $(e.target).toggleClass("unvisited wall")
                    currentCell = $(e.target).attr("id")
                }
            }
        }
    })
    .mouseup(function(e) {
        mouseDrag = false
        currentCell = null
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