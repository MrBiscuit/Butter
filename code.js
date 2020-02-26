function absoluteX(layer) {
    return layer.absoluteTransform[0][2];
}
function absoluteY(layer) {
    return layer.absoluteTransform[1][2];
}
let selection = figma.currentPage.selection;
let root = figma.root;
if (selection.length == 0) {
    figma.closePlugin('No object selected.');
}
if (selection.length < 2) {
    figma.closePlugin('Must select more than one object to run Butter.');
}
switch (figma.command) {
    case "up": {
        figma.showUI(__html__, { width: 240, height: 128 });
        figma.ui.postMessage("Spacing Up: " + root.getPluginData("amount"));
        break;
    }
    case "down": {
        figma.showUI(__html__, { width: 240, height: 128 });
        figma.ui.postMessage("Spacing Down: " + root.getPluginData("amount"));
        break;
    }
    case "left": {
        figma.showUI(__html__, { width: 240, height: 128 });
        figma.ui.postMessage("Spacing Left: " + root.getPluginData("amount"));
        break;
    }
    case "right": {
        figma.showUI(__html__, { width: 240, height: 128 });
        figma.ui.postMessage("Spacing Right: " + root.getPluginData("amount"));
        break;
    }
    case "bup": {
        var space = 0;
        var spaceApplied = 0;
        var tempXY = 0;
        var newarr = Array.from(selection).sort((a, b) => absoluteY(a) - absoluteY(b));
        newarr.forEach(element => {
            if (spaceApplied == 1) {
                var realObj = figma.getNodeById(element.id);
                realObj.y += tempXY - absoluteY(realObj);
                tempXY = tempXY + space + element.height;
            }
            else {
                tempXY = absoluteY(newarr[0]) + newarr[0].height + space;
                spaceApplied = 1;
            }
        });
        figma.closePlugin("Butted " + selection.length + " layers");
        break;
    }
    case "bdown": {
        var space = 0;
        var spaceApplied = 0;
        var tempXY = 0;
        var newarr = Array.from(selection).sort((a, b) => absoluteY(b) - absoluteY(a));
        newarr.forEach((element, index) => {
            if (spaceApplied == 1) {
                var realObj = figma.getNodeById(element.id);
                realObj.y += tempXY - absoluteY(realObj);
                tempXY = tempXY - space - (typeof newarr[index + 1] === "undefined" ? 0 : newarr[index + 1].height);
            }
            else {
                tempXY = absoluteY(newarr[0]) - space - newarr[1].height;
                spaceApplied = 1;
            }
        });
        figma.closePlugin("Butted " + selection.length + " layers");
        break;
    }
    case "bleft": {
        var space = 0;
        var spaceApplied = 0;
        var tempXY = 0;
        var newarr = Array.from(selection).sort((a, b) => absoluteX(a) - absoluteX(b));
        newarr.forEach(element => {
            if (spaceApplied == 1) {
                var realObj = figma.getNodeById(element.id);
                realObj.x += tempXY - absoluteX(realObj);
                tempXY = tempXY + space + element.width;
            }
            else {
                tempXY = absoluteX(newarr[0]) + newarr[0].width + space;
                spaceApplied = 1;
            }
        });
        figma.closePlugin("Butted " + selection.length + " layers");
        break;
    }
    case "bright": {
        var space = 0;
        var spaceApplied = 0;
        var tempXY = 0;
        var newarr = Array.from(selection).sort((a, b) => absoluteX(b) - absoluteX(a));
        newarr.forEach((element, index) => {
            if (spaceApplied == 1) {
                var realObj = figma.getNodeById(element.id);
                realObj.x += tempXY - absoluteX(realObj);
                tempXY = tempXY - space - (typeof newarr[index + 1] === "undefined" ? 0 : newarr[index + 1].width);
            }
            else {
                tempXY = absoluteX(newarr[0]) - space - newarr[1].width;
                spaceApplied = 1;
            }
        });
        figma.closePlugin("Butted " + selection.length + " layers");
        break;
    }
}
figma.ui.onmessage = (message) => {
    if (message.type == "cancel") {
        figma.closePlugin();
    }
    else if (message.type == "amount") {
        var space = message.amount;
        var spaceApplied = 0;
        var tempXY = 0;
        root.setPluginData("amount", String(space));
        switch (figma.command) {
            case "up": {
                var newarr = Array.from(selection).sort((a, b) => absoluteY(a) - absoluteY(b));
                newarr.forEach(element => {
                    if (spaceApplied == 1) {
                        var realObj = figma.getNodeById(element.id);
                        realObj.y += tempXY - absoluteY(realObj);
                        tempXY = tempXY + space + element.height;
                    }
                    else {
                        tempXY = absoluteY(newarr[0]) + newarr[0].height + space;
                        spaceApplied = 1;
                    }
                });
                figma.closePlugin();
                break;
            }
            case "down": {
                var newarr = Array.from(selection).sort((a, b) => absoluteY(b) - absoluteY(a));
                newarr.forEach((element, index) => {
                    if (spaceApplied == 1) {
                        var realObj = figma.getNodeById(element.id);
                        realObj.y += tempXY - absoluteY(realObj);
                        tempXY = tempXY - space - (typeof newarr[index + 1] === "undefined" ? 0 : newarr[index + 1].height);
                    }
                    else {
                        tempXY = absoluteY(newarr[0]) - space - newarr[1].height;
                        spaceApplied = 1;
                    }
                });
                figma.closePlugin();
                break;
            }
            case "left": {
                var newarr = Array.from(selection).sort((a, b) => absoluteX(a) - absoluteX(b));
                newarr.forEach(element => {
                    if (spaceApplied == 1) {
                        var realObj = figma.getNodeById(element.id);
                        realObj.x += tempXY - absoluteX(realObj);
                        tempXY = tempXY + space + element.width;
                    }
                    else {
                        tempXY = absoluteX(newarr[0]) + newarr[0].width + space;
                        spaceApplied = 1;
                    }
                });
                figma.closePlugin();
                break;
            }
            case "right": {
                var newarr = Array.from(selection).sort((a, b) => absoluteX(b) - absoluteX(a));
                newarr.forEach((element, index) => {
                    if (spaceApplied == 1) {
                        var realObj = figma.getNodeById(element.id);
                        realObj.x += tempXY - absoluteX(realObj);
                        tempXY = tempXY - space - (typeof newarr[index + 1] === "undefined" ? 0 : newarr[index + 1].width);
                    }
                    else {
                        tempXY = absoluteX(newarr[0]) - space - newarr[1].width;
                        spaceApplied = 1;
                    }
                });
                figma.closePlugin();
                break;
            }
        }
    }
};
