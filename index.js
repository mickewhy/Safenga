const discord = require('discord.js');
const safenga = new discord.Client();
const invite = 'NOPE';
const token = 'NOPE';
const prefix = 'saf ';

safenga.once('ready', () => {
    console.log('Safenga is online!');
})

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }
    return arr;
}

function emojifyArray(array) {
    var emojiArray = createArray(array.length, array[0].length);
    for (var i = 0; i < array.length; i++)
        for (var j = 0; j < array[0].length; j++)
            switch (array[i][j]) {
                case 0:
                    emojiArray[i][j] = '⚪';
                    break;
                case 1:
                    emojiArray[i][j] = '🔴';
                    break;
                case 2:
                    emojiArray[i][j] = '🔵';
                    break;
                default:
                    break;
            }
    return emojiArray;
}

function displayArray(array) {
    for (var i = 0; i < array.length; i++) {
        var row = '';
        for (var j = 0; j < array[0].length; j++)
            row += array[i][j];
        console.log(row);
    }
}

safenga.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') message.channel.send('pong');

    if (command === 'pong') message.channel.send('ping');

    if (command === 'marco') message.channel.send('polo');

    if (command === 'pog') message.channel.send('<:lolPOGGER:779821854885675038>');

    if (command.startsWith('connect4')) {
        if (!message.mentions.users.size)
            return message.reply('Syntax: ' + prefix + 'connect4 <player2>');

        const p1 = message.author;
        const p2 = message.mentions.users.first();

        const array = [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]];
        const emojiArray = emojifyArray(array);

        var currentPlayer = p2;
        var gameRunning = true;
        var move = '';
        var color = '';

        const filter = (m) => m.author.id === currentPlayer.id
            && m.content.length == 2
            && (m.content.startsWith('a') | m.content.startsWith('b') | m.content.startsWith('c') | m.content.startsWith('d') | m.content.startsWith('e') | m.content.startsWith('f') | m.content.startsWith('g'))
            && (m.content.endsWith('1') | m.content.endsWith('2') | m.content.endsWith('3') | m.content.endsWith('4') | m.content.endsWith('5') | m.content.endsWith('6'));

        const embed = new discord.MessageEmbed()
            /*.setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()*/
            .setColor('#FFFFFE')
            .setDescription('1  ' + emojiArray[0][0] + emojiArray[0][1] + emojiArray[0][2] + emojiArray[0][3] + emojiArray[0][4] + emojiArray[0][5] + emojiArray[0][6] +
                '\n2 ' + emojiArray[1][0] + emojiArray[1][1] + emojiArray[1][2] + emojiArray[1][3] + emojiArray[1][4] + emojiArray[1][5] + emojiArray[1][6] +
                '\n3 ' + emojiArray[2][0] + emojiArray[2][1] + emojiArray[2][2] + emojiArray[2][3] + emojiArray[2][4] + emojiArray[2][5] + emojiArray[2][6] +
                '\n4 ' + emojiArray[3][0] + emojiArray[3][1] + emojiArray[3][2] + emojiArray[3][3] + emojiArray[3][4] + emojiArray[3][5] + emojiArray[3][6] +
                '\n5 ' + emojiArray[4][0] + emojiArray[4][1] + emojiArray[4][2] + emojiArray[4][3] + emojiArray[4][4] + emojiArray[4][5] + emojiArray[4][6] +
                '\n6 ' + emojiArray[5][0] + emojiArray[5][1] + emojiArray[5][2] + emojiArray[5][3] + emojiArray[5][4] + emojiArray[5][5] + emojiArray[5][6] +
                '\n       a     b    c     d     e     f     g');

        while (gameRunning) {
            if (currentPlayer.id === p1.id) { currentPlayer = p2; color = 'b'; }
            else { currentPlayer = p1; color = 'r'; }

            embed.setFooter(`${currentPlayer.username}'s turn`);

            message.channel.send(embed);
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then((collected) => {
                    move = collected.first().content;
                    switch (move.charAt(1)) {
                        case '1':
                            move = move.replace('1', '0');
                            break;
                        case '2':
                            move = move.replace('2', '1');
                            break;
                        case '3':
                            move = move.replace('3', '2');
                            break;
                        case '4':
                            move = move.replace('4', '3');
                            break;
                        case '5':
                            move = move.replace('5', '4');
                            break;
                        case '6':
                            move = move.replace('6', '5');
                            break;
                    }

                    switch (move.charAt(0)) {
                        case 'a':
                            move = move.replace('a', '0');
                            break;
                        case 'b':
                            move = move.replace('b', '1');
                            break;
                        case 'c':
                            move = move.replace('c', '2');
                            break;
                        case 'd':
                            move = move.replace('d', '3');
                            break;
                        case 'e':
                            move = move.replace('e', '4');
                            break;
                        case 'f':
                            move = move.replace('f', '5');
                            break;
                        case 'g':
                            move = move.replace('g', '6');
                            break;
                    }

                    if (array[Number(move.charAt(0))][Number(move.charAt(1))] != 0) { //INVALID MOVE
                    }
                    else {
                        while (Number(move.charAt(0)) + 1 <= array.length - 1 && array[Number(move.charAt(0)) + 1][Number(move.charAt(1))] == 0)
                            move = (Number(move.charAt(0)) + 1) + move.charAt(1);
                        message.channel.send(`GRAVITY NEW MOVE = ${move}`);
                    }
                    message.channel.send("Accepted move");
                })
                .catch((err) => {
                    message.channel.send("Timed out");
                    gameRunning = false;
                });
        }
    }
});

safenga.login(token);