function absoluteX(layer) {
    return layer.absoluteTransform[0][2]
}

function absoluteY(layer) {
    return layer.absoluteTransform[1][2]
}

figma.showUI(__html__, { width: 240, height: 128 })

let selection = figma.currentPage.selection;
if (selection.length == 0) {
    figma.closePlugin('No object selected.')
}
if (selection.length < 2) {
    figma.closePlugin('Must select more than one object to run Paddy.')
}

switch (figma.command) {
    case "up": {
        figma.ui.postMessage("Spacing Up:")
        break;
    } case "down": {
        figma.ui.postMessage("Spaceing Down:")
        break;
    } case "left": {
        figma.ui.postMessage("Spacing Left:")
        break;
    } case "right": {
        figma.ui.postMessage("Spaceing Right:")
        break;
    }
}

figma.ui.onmessage = (message) => {

    if (message.type == "cancel") {

        figma.closePlugin();

    } else if (message.type == "amount") {

        var space = message.amount;
        var spaceApplied = 0;

        var tempXY = 0;

        switch (figma.command) {

            case "up": {

                var newarr = Array.from(selection).sort((a, b) => absoluteY(a) - absoluteY(b));

                newarr.forEach(element => {

                    if (spaceApplied == 1) {

                        var realObj = figma.getNodeById(element.id);
                        realObj.y += tempXY - absoluteY(realObj);
                        tempXY = tempXY + space + element.height;

                    } else {

                        tempXY = absoluteY(newarr[0]) + newarr[0].height + space;
                        spaceApplied = 1;
                    }
                });

                break;

            } case "down": {

                var newarr = Array.from(selection).sort((a, b) => absoluteY(b) - absoluteY(a));

                newarr.forEach((element, index) => {

                    if (spaceApplied == 1) {

                        var realObj = figma.getNodeById(element.id);
                        realObj.y += tempXY - absoluteY(realObj);
                        tempXY = tempXY - space - (typeof newarr[index+1] === "undefined" ? 0 : newarr[index+1].height);

                    } else {

                        tempXY = absoluteY(newarr[0]) - space - newarr[1].height;
                        spaceApplied = 1;
                    }
                });
                break;

            } case "left": {

                var newarr = Array.from(selection).sort((a, b) => absoluteX(a) - absoluteX(b));

                newarr.forEach(element => {

                    if (spaceApplied == 1) {

                        var realObj = figma.getNodeById(element.id);
                        realObj.x += tempXY - absoluteX(realObj);
                        tempXY = tempXY + space + element.width;

                    } else {

                        tempXY = absoluteX(newarr[0]) + newarr[0].width + space;
                        spaceApplied = 1;
                    }
                });

                break;

            } case "right": {

                var newarr = Array.from(selection).sort((a, b) => absoluteX(b) - absoluteX(a));

                newarr.forEach((element, index) => {
                    console.log(absoluteX(element));

                    if (spaceApplied == 1) {

                        var realObj = figma.getNodeById(element.id);
                        realObj.x += tempXY - absoluteX(realObj);
                        tempXY = tempXY - space - (typeof newarr[index+1] === "undefined" ? 0 : newarr[index+1].width);

                    } else {

                        tempXY = absoluteX(newarr[0]) - space - newarr[1].width;
                        spaceApplied = 1;
                    }
                });
                break;
            }
        }

    }

}