import { RpgPlayer, RpgMap, RpgPlayerHooks, Direction, Move, RpgShape, ShapePositioning, Control, RpgEvent, EventData, RpgWorld, AbstractObject } from '@rpgjs/server'
import { Armor } from '@rpgjs/database'
import { TextComponentObject } from '@rpgjs/types';

let i = 0

@Armor({
    name: 'Shield',
    description: 'Gives a little defense',
    price: 4000
})
export class Shield { }

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

declare module '@rpgjs/server' {
    export interface RpgPlayer {
        woold: number
    }
}

function TextComponent(value: string, style?: TextComponentObject['value']): TextComponentObject {
    return {
        id: 'text',
        value: {
            text: value,
            style: {
                fill: '#ffffff',
                fontSize: 18,
                fontWeight: 'bold',
                align: 'center'
            }
        }
    }
}

function BarComponent(current: string, max: string) {
    return {
        id: 'bar',
        value: {
            current,
            max,
            style: {
                perPercent: {
                    '50': {
                        fillColor: '#ff0000'
                    },
                }
            }
        }
    }
}

export const player: RpgPlayerHooks = {
    props: {
        color: String
    },
    onConnected(player: RpgPlayer) {
        player.setHitbox(16, 16)
        player.setGraphic('jedi')
        player.changeMap('samplemap')
        player.name = 'Sam'
        player.setComponentsTop<any>(
            [
                [TextComponent('X: {position.x}, Y: {position.y}')],
                [BarComponent('hp', 'param.maxHp')],
            ]
        )
        // player.setMoveMode({
        //     collision: true,
        //     clientMode: {
        //         drag: {
        //             area: [0, 0, 5, 5]
        //         }
        //     },
        //     behavior: 'direction'
        // })
    },
    onJoinMap(player: RpgPlayer, map: RpgMap) {
       

        //player.position.z = 2 * 32
    },
    onInput(player: RpgPlayer, { input, moving }) {
        if (input == 'attack') {
            player.showAnimation('jedi', 'attack', true)
            const map = player.getCurrentMap()
            /*map?.createMovingHitbox([
                { x: player.position.x + 50, y: player.position.y, width: 10, height: 10 }
            ]).subscribe({
                next(hitbox: AbstractObject): void {
                    console.log(hitbox.otherPlayersCollision)

                }
            })*/
            player.hp -= 400
        }
    },
    async onInShape(player: RpgPlayer, shape: RpgShape) {
        console.log('in', player.name, shape.name)
        // await player.changeMap('samplemap')
    },
    onOutShape(player: RpgPlayer, shape: RpgShape) {
        console.log('out', player.name, shape.name)
    }
} 