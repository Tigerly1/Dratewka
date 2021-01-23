class Location {
    constructor(wszystko, items, twojeitemy) {
        this.place = wszystko.split(",", 1)[0]
        this.gif = wszystko.split(",", 2)[1].replace(" ", '')
        this.rgb = wszystko.split(",")[2] + "," + wszystko.split(",")[3] + "," + wszystko.split(",")[4]
        this.youcango = wszystko.split(",")[5].replace(" ", '')
        this.validationtab = []
        this.twojeitemy = twojeitemy
        var itemy = ""
        if (items != "NOTHING") {
            function mapowanko(despacito) {
                if (despacito.length > 0 && despacito != "NOTHING") return itemy += despacito.split(",")[0].split(" - ")[1] + ", "
            }
            items.split("|").map(mapowanko)
            this.itemy = itemy
        }
        else this.itemy = items
        this.validation()
        this.createDesign()
    }
    validation() {
        var direction = ["E", "EAST", "S", "SOUTH", "W", "WEST", "N", "NORTH"]
        var ildir = this.youcango.length
        for (let i = 0; i < ildir; i++) {
            if (direction.indexOf(this.youcango[i]) >= 0) {
                this.validationtab.push(direction[direction.indexOf(this.youcango[i])])
                this.validationtab.push(direction[direction.indexOf(this.youcango[i]) + 1])
            }
        }
    }

    createDesign() {
        var direction = ["E", "EAST", "S", "SOUTH", "W", "WEST", "N", "NORTH"]
        var gdzie = ""
        for (let i = 0; i < this.validationtab.length; i++) {
            if (i % 2 == 1) gdzie += this.validationtab[i] + " "
        }
        if (this.twojeitemy != "NOTHING") var twojitem = this.twojeitemy.split(",")[0].split(" - ")[1].toString()
        else var twojitem = "NOTHING"
        document.getElementById("all").innerHTML = ""
        var that = this
        var div = document.createElement("div")
        div.innerText = this.place
        document.getElementById("all").append(div)
        var img = document.createElement("img")
        img.src = "img/" + this.gif
        img.style.backgroundColor = this.rgb
        document.getElementById("all").append(img)
        var kompas = document.createElement("div")
        kompas.id = "kompas"
        document.getElementById("all").append(kompas)
        for (let i = 0; i < 4; i++) {
            var div = document.createElement('div')
            div.id = i
            document.getElementById("kompas").append(div)
        }
        let wow = ["E", "S", "W", "N"]
        wow.map((element, i) => {
            if (this.youcango.indexOf(wow[i]) < 0) {
                switch (element) {
                    case "E":
                        document.getElementById(i).style.top = "27%"
                        document.getElementById(i).style.left = "87%"
                        break
                    case "S":
                        document.getElementById(i).style.top = "87%"
                        document.getElementById(i).style.left = "45%"
                        break
                    case "W":
                        document.getElementById(i).style.top = "27%"
                        break
                    case "N":
                        document.getElementById(i).style.left = "43%"
                        break
                }
            }
        })
        var divb = document.createElement("div")
        divb.id = "divb"
        divb.innerHTML = "YOU CAN GO " + gdzie + "<br>" +
            "YOU SEE " + this.itemy + "<br>" +
            "YOU ARE CARRYING " + twojitem
            + "<br> <br> <br>"
        document.getElementById("all").append(divb)
        var divd = document.createElement("div")
        divd.id = "divd"
        divd.innerHTML = "WHAT NOW? "
        document.getElementById("all").append(divd)
        var input = document.createElement("input")
        input.type = "textbox"
        input.onblur = function () { onblur() };
        function onblur() {
            input.focus()
        }
        divd.append(input)
        window.onkeydown = (e) => { if (e.keyCode == 9) e.preventDefault() }
        input.select()
        var divxd = document.createElement("div")
        divxd.id = 'divxd'
        var lol = ""
        document.getElementById('divd').append(divxd)
        input.onkeypress = function (event) { onkeypress(event) };
        input.onkeydown = ((event) => {
            if (event.keyCode == 8) lol = lol.slice(0, -1)
            divxd.style.left = lol.length * 15 + 150 + 'px'
        })
        let addadd = 0
        setInterval(() => {
            addadd++
            if (addadd % 2 == 0) divxd.style.backgroundColor = "#CCC"
            else divxd.style.backgroundColor = "#555"

        }, 500)
        function onkeypress(event) {
            setTimeout(function () {
                if (event.keyCode == 9) {
                    event.preventDefault()
                    input.select()
                }
                if (event.keyCode > 95 && event.keyCode < 123) lol += String.fromCharCode(event.keyCode).toUpperCase()
                if (event.keyCode > 63 && event.keyCode < 90) lol += String.fromCharCode(event.keyCode).toLowerCase()
                if (event.keyCode == 32) lol += " "
                input.value = lol
                divxd.style.left = lol.length * 15 + 150 + 'px'
                if (event.keyCode == 13 || event.keyCode == 10) {
                    var inputval = input.value
                    input.value = ""
                    lol = ""
                    if (direction.indexOf(inputval) >= 0) {
                        if (that.validationtab.indexOf(inputval) >= 0) {
                            divd.innerHTML = "YOU ARE GOING " + that.validationtab[that.validationtab.indexOf(inputval) + 1] + " . . ."
                            setTimeout(() => {
                                game.player.go(inputval, that.twojeitemy)
                            }, 700)
                        }
                        else {
                            divd.innerText = "YOU CAN'T GO THAT WAY"
                            setTimeout(() => {
                                game.player.equipment(that.twojeitemy, inputval)
                            }, 700)
                        }
                    }
                    else if (inputval.split(" ")[0] == "TAKE" || inputval.split(" ")[0] == "T") game.player.equipment(that.twojeitemy, inputval)
                    else if (inputval.split(" ")[0] == "DROP" || inputval.split(" ")[0] == "D") game.player.equipment(that.twojeitemy, inputval)
                    else if (inputval.split(" ")[0] == "USE" || inputval.split(" ")[0] == "U") game.player.equipment(that.twojeitemy, inputval)
                    else if (inputval.split(" ")[0] == "V" || inputval.split(" ")[0] == "VOCABULARY") game.player.equipment(that.twojeitemy, inputval)
                    else if (inputval.split(" ")[0] == "G" || inputval.split(" ")[0] == "GOSSIPS") game.player.equipment(that.twojeitemy, inputval)
                    else {
                        document.getElementById("divd").innerHTML = "Try another word or V for vocabulary"
                        setTimeout(() => {
                            game.player.equipment(that.twojeitemy, inputval)
                        }, 700)
                    }
                }
            }, 1);
        }
    }
}
document.addEventListener("DOMContentLoaded", function (event) {
    game = {
        board: [
            ["You are inside a brimstone mine, 11.gif, rgb(235,211,64), E", "You are at the entrance to the mine, 12.gif, rgb(89,93,87), EW", "A hill, 13.gif, rgb(117,237,243), ESW", "Some bushes, 14.gif, rgb(202,230,51), EW", "An old deserted hut, 15.gif, rgb(220,204,61), EW", "The edge of a forest, 16.gif, rgb(167,245,63), EW", "A dark forest, 17.gif, rgb(140,253,99), SW"],
            ["A man nearby making tar, 21.gif, rgb(255,190,99), ES", "A timber yard, 22.gif, rgb(255,190,99), ESW", "You are by a roadside shrine, 23.gif, rgb(167,245,63), ESWN", "You are by a small chapel, 24.gif, rgb(212,229,36), EW", "You are on a road leading to a wood, 25.gif, rgb(167,245,63), ESW", "You are in a forest, 65.gif, rgb(167,245,63), EW", "You are in a deep forest, 27.gif, rgb(140,253,99), WN"],
            ["You are by the Vistula River, 31.gif, rgb(122,232,252), EN", "You are by the Vistula River, 32.gif, rgb(140,214,255), WN", "You are on a bridge over river, 33.gif, rgb(108,181,242), SN", "You are by the old tavern, 34.gif, rgb(255,189,117), E", "You are at the town's end, 35.gif, rgb(255,190,99), SWN", "You are in a butcher's shop, 36.gif, rgb(255,188,102), S", "You are in a cooper's house, 37.gif, rgb(255,188,102), S"],
            ["You are in the Wawel Castle, 41.gif, rgb(255,176,141), E", "You are inside a dragon's cave, 42.gif, rgb(198,205,193), EW", "A perfect place to set a trap, 43.gif, rgb(255,176,141), WN", "You are by the water mill, 44.gif, rgb(255,190,99), E", "You are at a main crossroad, 45.gif, rgb(255,190,99), ESWN", "You are on a town street, 46.gif, rgb(255,190,99), EWN", "You are in a frontyard of your house, 47.gif, rgb(255,190,99), SWN"],
            ["", "", "", "You are by a swift stream, 54.gif, rgb(108,181,242), E", "You are on a street leading forest, 55.gif, rgb(255,190,99), SWN", "You are in a woodcutter's backyard, 56.gif, rgb(255,190,99), S", "You are in a shoemaker's house, 57.gif, rgb(254,194,97), N"],
            ["", "", "", "You are in a bleak funeral house, 64.gif, rgb(254,194,97), E", "You are on a path leading to the wood, 65.gif, rgb(167,245,63), EWN", "You are at the edge of a forest, 66.gif, rgb(167,245,63), EWN", "You are in a deep forest, 67.gif, rgb(140,253,99), W"]
        ],
        items: [
            ["10 - a KEY,1,KEY", "11 - an AXE,1,AXE", "12 - STICKS,1,STICKS", "13 - sheeplegs,0,sheeplegs", "14 - MUSHROOMS,1,MUSHROOMS", "15 - MONEY,1,MONEY", "16 - a BARREL,1,BARREL", "17 - a sheeptrunk,0,sheeptrunk", "18 - BERRIES,1,BERRIES", "19 - WOOL,1,WOOL"],
            ["20 - a sheepskin,0,sheepskin", "21 - a BAG,1,BAG", "22 - a RAG,1,RAG", "23 - a sheephead,0,sheephead", "24 - a SPADE,1,SPADE", "25 - SULPHUR,1,SULPHUR", "26 - a solid poison,0,solid poison", "27 - a BUCKET,1,BUCKET", "28 - TAR,1,TAR", "29 - a liquid poison,0,liquid poison"],
            ["30 - a dead dragon,0,dead dragon", "31 - a STONE,1,STONE", "32 - a FISH,1,FISH", "33 - a KNIFE,1,KNIFE", "34 - a DRAGONSKIN,1,DRAGONSKIN", "35 - a dragonskin SHOES,1,SHOES", "36 - a PRIZE,1,PRIZE", "37 - a SHEEP,1,SHEEP"]
        ],

        startitemslocation: [
            "13 - 31", "15 - 27", "17 - 14", "23 - 10", "27 - 18", "32 - 32", "44 - 21", "55 - 33", "64 - 24"
        ],
        zaleznosci: [
            "10, 56, 11, You opened a tool shed and took an axe", "11, 67, 12, You cut sticks for sheeplegs", "12, 43, 13(L), You prepared legs for your fake sheep, OK", "14, 34, 15, The tavern owner paid you money", "15, 37, 16, The cooper sold you a new barrel", "16, 43, 17(L), You made a nice sheeptrunk, OK", "18, 36, 19, The butcher gave you wool", "19, 43, 20(L), You prepared skin for your fake sheep, OK", "21, 57, 22, You used your tools to make a rag", "22, 43, 23(L), You made a fake sheephead, OK", "24, 11, 25, You are digging... (timeout) and digging... (timeout) That's enough sulphur for you", "25, 43, 26(L), You prepared a solid poison, OK", "27, 21, 28, You got a bucket full of tar", "28, 43, 29(L), You prepared a liquid poison, OK", "99 ,43, 37, Your fake sheep is full of poison and ready to be eaten by the dragon", "37, 43, 30(L), The dragon noticed your gift... (timeout) The dragon ate your sheep and died!", "33, 43, 34, You cut a piece of dragon's skin", "34, 57, 35, You used your tools to make shoes", "35, 41, 36, The King is impressed by your shoes", "36 -> koniec gry - załadowanie odpowiedniej grafiki"
        ],
        player: {
            pos_y: 4,
            pos_x: 7,
            go: function (inputval, twojeitemy) {
                if (inputval == "E" || inputval == "EAST") this.pos_x++;
                if (inputval == "S" || inputval == "SOUTH") this.pos_y++;
                if (inputval == "W" || inputval == "WEST") this.pos_x--;
                if (inputval == "N" || inputval == "NORTH") this.pos_y--;
                if (this.pos_y + "" + this.pos_x == "41") {
                    let indexik = game.startitemslocation.map((liczba) => {
                        return liczba.slice(0, 2)
                    }).indexOf("43")
                    var marek1 = 0
                    let marek = game.startitemslocation[indexik].split(" - ")[1].split(",").map((skubichrupki) => {
                        if (skubichrupki == 30) return marek1 = 1
                    })
                    if (marek1 == 0) {
                        document.getElementById("divd").innerHTML = "YOU CAN'T GO THROUGH THIS CAVE BECOUSE DRAGON IS'T KILLED"
                        this.pos_x++
                        setTimeout(() => {
                            game.player.equipment(twojeitemy, inputval);
                        }, 700)
                    }
                    else game.player.equipment(twojeitemy, inputval);

                }
                else game.player.equipment(twojeitemy, inputval);
            },

            poczatek: function () {
                document.body.style.backgroundImage = "url('img/start.jpg')"
                setTimeout(() => {
                    document.body.style.backgroundImage = "url('img/starta.jpg')"
                    document.body.innerHTML = ""
                }, 5000)
                setTimeout(() => {
                    document.body.style.backgroundImage = "url('img/startb.jpg')"
                }, 10000)
                setTimeout(() => {
                    document.body.style.backgroundImage = "none"
                    let div = document.createElement("div")
                    div.id = "all"
                    document.body.append(div)
                    game.player.equipment()
                }, 15000)
            },
            equipment: function (twojeitemy, inputval) {
                var currentitem = ""
                let indexik = game.startitemslocation.map(getXY).indexOf(this.pos_y + "" + this.pos_x)
                function getXY(liczba) {
                    return liczba.slice(0, 2)
                }
                if (twojeitemy == undefined) twojeitemy = "NOTHING"
                if (indexik >= 0) {
                    let itemid = game.startitemslocation[indexik].split(" - ")[1]
                    function essa(essamod) {
                        return currentitem += game.items[+essamod[0] - 1][+essamod[1]] + "|"
                    }
                    itemid.split(",").map(essa)
                }
                else (currentitem = "NOTHING")
                return new Equipment(this.pos_y + "" + this.pos_x, twojeitemy, currentitem, inputval)
            },
            itemstaking: function (id) {
                let indexik = game.startitemslocation.map(getXY).indexOf(this.pos_y + "" + this.pos_x)
                function getXY(liczba) {
                    return liczba.slice(0, 2)
                }
                if (indexik >= 0) {
                    var startitemslocationprototype = this.pos_y + "" + this.pos_x + " - "
                    if (game.startitemslocation[indexik].search(",") >= 0) {
                        game.startitemslocation[indexik].split(" - ")[1].split(",").map((fajen) => {
                            if (fajen != id) startitemslocationprototype += fajen + ","
                        })
                        game.startitemslocation[indexik] = startitemslocationprototype.slice(0, -1)
                    }
                    else game.startitemslocation.splice(indexik, 1)
                }
            },

            itemdrop: function (twojeitemy) {
                let indexik = game.startitemslocation.map(getXY).indexOf(this.pos_y + "" + this.pos_x)
                function getXY(liczba) {
                    return liczba.slice(0, 2)
                }
                if (indexik >= 0) game.startitemslocation[indexik] += "," + twojeitemy
                else game.startitemslocation.push(this.pos_y + "" + this.pos_x + " - " + twojeitemy)
            },
            start: function (currentitem, twojeitemy) {
                if (twojeitemy == "" || twojeitemy == undefined) twojeitemy = "NOTHING"
                return new Location(game.board[this.pos_y - 1][this.pos_x - 1], currentitem, twojeitemy)
            }
        }
    }
    game.player.poczatek()
})

class Equipment {
    constructor(pozycja, twojeitemy, currentitem, currentvoc) {
        this.pozycja = pozycja
        this.currentitem = currentitem
        this.twojeitemy = twojeitemy
        this.currentvoc = currentvoc
        if (currentvoc != undefined)
            if (this.currentvoc.split(" ")[0] == "TAKE" || this.currentvoc.split(" ")[0] == "T") this.take()
            else if (this.currentvoc.split(" ")[0] == "DROP" || this.currentvoc.split(" ")[0] == "D") this.drop()
            else if (this.currentvoc.split(" ")[0] == "USE" || this.currentvoc.split(" ")[0] == "U") this.use()
            else if (this.currentvoc.split(" ")[0] == "V" || this.currentvoc.split(" ")[0] == "VOCABULARY") this.voc()
            else if (this.currentvoc.split(" ")[0] == "G" || this.currentvoc.split(" ")[0] == "GOSSIPS") this.gos()
            else this.aktualnyeq()
        else this.aktualnyeq()
    }
    take() {
        if (this.currentitem != "NOTHING" && this.currentvoc != "TAKE" && this.currentvoc != "T") {
            var itembezodmiany = ""
            this.currentitem.split("|").map((troll) => {
                if (troll.split(",")[2] == this.currentvoc.split(" ")[1]) return itembezodmiany = troll.split(",")[2] + "," + troll.split(",")[1] + "," + troll.split(" - ")[0]
            })
        }
        if (this.currentvoc == "TAKE" || this.currentvoc == "T") {
            if (this.twojeitemy == "NOTHING") {
                document.getElementById("divd").innerHTML = "YOU ARE CARRYING NOTHING"
            }
            else document.getElementById("divd").innerHTML = "YOU ARE CARRYING " + this.twojeitemy.split(",")[0].split(" - ")[1].toString()
        }
        else if (this.currentvoc == "TAKE " + itembezodmiany.split(",")[0] || this.currentvoc == "T " + itembezodmiany.split(",")[0])
            if (itembezodmiany.split(",")[1] != 0)
                if (this.twojeitemy == "NOTHING") {
                    document.getElementById("divd").innerHTML = "YOU ARE TAKING " + itembezodmiany.split(",")[0]
                    var currentitem = ""
                    this.currentitem.split("|").map((smiesznosc) => {
                        if (smiesznosc.split(",")[2] != itembezodmiany.split(",")[0] && smiesznosc.length > 0) return currentitem += smiesznosc + "|"
                        else if (smiesznosc.length > 0) return this.twojeitemy = smiesznosc
                    })
                    if (currentitem == "") currentitem = "NOTHING"
                    this.currentitem = currentitem
                    game.player.itemstaking(itembezodmiany.split(",")[2])

                }
                else document.getElementById("divd").innerHTML = "YOU ARE CARRYING SOMETHING"
            else document.getElementById("divd").innerHTML = "YOU CAN'T CARRY IT"
        else document.getElementById("divd").innerHTML = "THERE ISN'T ANYTHING LIKE THAT"
        setTimeout(() => {
            this.aktualnyeq()
        }, 700)
    }

    drop() {
        var tablicaidczowcy = ["13", "17", "20", "23", "26", "29", "30"]
        var ilitemynaziemi = 0
        this.currentitem.split("|").map((liczonko) => {
            if (tablicaidczowcy.indexOf(liczonko.split(",")[0].split(" - ")[0]) < 0 && liczonko.length > 0) return ilitemynaziemi++
        })
        if (this.twojeitemy != "NOTHING") {
            var itembezodmiany = this.twojeitemy.split(",")[2].toString()
            if (this.currentvoc == "DROP" || this.currentvoc == "D") document.getElementById("divd").innerHTML = "YOU ARE NOT CARRYING ANYTHING"
            else if (ilitemynaziemi < 3)
                if (this.currentvoc == "DROP " + itembezodmiany || this.currentvoc == "D " + itembezodmiany) {
                    document.getElementById("divd").innerHTML = "YOU ARE ABOUT TO DROP " + this.twojeitemy.split(",")[0].split(" - ")[1].toString()
                    if (this.currentitem != "NOTHING") this.currentitem += "|" + this.twojeitemy
                    else this.currentitem = this.twojeitemy
                    game.player.itemdrop(this.twojeitemy.split(" - ")[0])
                    this.twojeitemy = "NOTHING"
                }
                else document.getElementById("divd").innerHTML = "YOU ARE NOT CARRYING IT"
            else document.getElementById("divd").innerHTML = "YOU CAN'T HAVE MORE THAN 3 ITEMS IN ONE LOCATION"
        }
        else document.getElementById("divd").innerHTML = "YOU ARE NOT CARRYING ANY ITEM"
        setTimeout(() => {
            this.aktualnyeq()
        }, 700)
    }

    use() {
        var timeoutczas = 1000
        if (this.twojeitemy == "NOTHING") document.getElementById("divd").innerHTML = "YOU CAN'T USE NOTHING"
        else {
            var itembezodmiany = this.twojeitemy.split(",")[2].toString()
            if (this.currentvoc == "USE " + itembezodmiany || this.currentvoc == "U " + itembezodmiany) {
                var getid = game.zaleznosci.map(getitemid).indexOf(this.twojeitemy.split(" - ")[0])
                function getitemid(index) {
                    return index.slice(0, 2)
                }
                if (getid >= 0)
                    if (itembezodmiany == "PRIZE") {
                        document.body.style.backgroundImage = "url('img/end.jpg')"
                        document.body.innerHTML = ""
                        timeoutczas = 99999999999
                    }
                    else if (game.zaleznosci[getid].slice(4, 6) == this.pozycja) {
                        if (game.zaleznosci[getid].search("(timeout)") == -1) document.getElementById("divd").innerHTML = game.zaleznosci[getid].split(",")[3]
                        else {
                            var ilosctimoutow = 0
                            document.getElementById("divd").innerHTML = game.zaleznosci[getid].split(",")[3].split("(timeout)").map((timeoucik) => {
                                return ilosctimoutow++
                            })
                            document.getElementById("divd").innerHTML = game.zaleznosci[getid].split(",")[3].split("(timeout)").map((timeoucik, xd) => {
                                setTimeout(() => {
                                    document.getElementById("divd").innerHTML = timeoucik
                                }, xd * 1000)
                            })
                            timeoutczas = ilosctimoutow * timeoutczas
                        }
                        if (itembezodmiany == "KNIFE") {
                            let indexik = game.startitemslocation.map((liczba) => {
                                return liczba.slice(0, 2)
                            }).indexOf("43")
                            var marek1 = 0
                            if (indexik >= 0) {
                                let marek = game.startitemslocation[indexik].split(" - ")[1].split(",").map((skubichrupki) => {
                                    if (skubichrupki == 30) return marek1 = 1
                                })
                            }
                            if (marek1 == 1) {
                                this.twojeitemy = game.items[+game.zaleznosci[getid].slice(8, 9) - 1][+game.zaleznosci[getid].slice(9, 10)]
                            }
                            else document.getElementById("divd").innerHTML = "NOTHING HAPPEND"
                        }
                        else if (game.zaleznosci[getid].search("(L)") == -1) {
                            this.twojeitemy = game.items[+game.zaleznosci[getid].slice(8, 9) - 1][+game.zaleznosci[getid].slice(9, 10)]
                        }
                        else {
                            this.twojeitemy = "NOTHING"
                            this.currentitem += "|" + game.items[+game.zaleznosci[getid].slice(8, 9) - 1][+game.zaleznosci[getid].slice(9, 10)]
                            game.player.itemdrop(game.items[+game.zaleznosci[getid].slice(8, 9) - 1][+game.zaleznosci[getid].slice(9, 10)].split(" - ")[0])
                        }
                        if (itembezodmiany == "SHEEP") game.board[+this.pozycja[0] - 1][+this.pozycja[1] - 1] = game.board[+this.pozycja[0] - 1][+this.pozycja[1] - 1].split(',').splice(0, 1) + ", smok.bmp," + game.board[+this.pozycja[0] - 1][+this.pozycja[1] - 1].split(',').splice(2, 6)

                    }
                    else document.getElementById("divd").innerHTML = "NOTHING HAPPEND"
                else document.getElementById("divd").innerHTML = "NOTHING HAPPEND"
            }
            else document.getElementById("divd").innerHTML = "YOU AREN'T CARRYING ANYTHING LIKE THAT"
        }
        var tablicaidczowcy = ["13", "17", "20", "23", "26", "29"]
        var ilitemowczowcynaziemi = 0
        this.currentitem.split("|").map((liczonko) => {
            if (tablicaidczowcy.indexOf(liczonko.split(",")[0].split(" - ")[0]) >= 0 && liczonko.length > 0) return ilitemowczowcynaziemi++
        })
        if (ilitemowczowcynaziemi == 6) {
            var allitemscollectedzal = game.zaleznosci[game.zaleznosci.map(getitemid).indexOf("99")]
            function getitemid(index) {
                return index.slice(0, 2)
            }
            this.twojeitemy = game.items[allitemscollectedzal.slice(8, 9) - 1][allitemscollectedzal.slice(9, 10)]
            document.getElementById("divd").innerHTML = allitemscollectedzal.split(",")[3]
            game.startitemslocation.splice(game.startitemslocation.indexOf(this.pozycja), 1)
            this.currentitem = "NOTHING"
        }
        setTimeout(() => {
            this.aktualnyeq()
        }, timeoutczas)
    }
    voc() {
        document.getElementById("divb").innerHTML = "NORTH or N, SOUTH or S" + "<br>" +
            "WEST or W, EAST or E" + "<br>" +
            "TAKE (object) or T (object)" + "<br>" +
            "DROP (object) or D (object)" + "<br>" +
            "USE (object) or U (object)" + "<br>" +
            "GOSSIPS or G, VOCABULARY or V" + "<br>" + "<br>" + "Press any key"
        document.getElementById("divd").innerHTML = ""
        var input = document.createElement("input")
        input.type = "textbox"
        input.onblur = function () { onblur() };
        function onblur() {
            input.focus()
        }
        divd.append(input)
        input.onkeydown = (() => {
            setTimeout(() => {
                this.aktualnyeq()
            }, 20)
        })
        input.select()
    }

    gos() {
        document.getElementById("divb").innerHTML = "The  woodcutter lost  his home key..." +
            "The butcher likes fruit... The cooper" +
            "is greedy... Dratewka plans to make a" +
            "poisoned  bait for the dragon...  The" +
            "tavern owner is buying food  from the" +
            "pickers... Making a rag from a bag..." + "<br>" + "<br>" +
            "Press any key"
        document.getElementById("divd").innerHTML = ""
        var input = document.createElement("input")
        input.type = "textbox"
        input.onblur = function () { onblur() };
        function onblur() {
            input.focus()
        }
        divd.append(input)
        input.onkeydown = (() => {
            setTimeout(() => {
                this.aktualnyeq()
            }, 20)
        })
        input.select()
    }
    aktualnyeq() {
        game.player.start(this.currentitem, this.twojeitemy)
    }

}
