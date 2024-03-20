import {Directive, DirectiveBinding} from "vue";

interface TTStyles {
    styleName: string,
    styleValue: string | number
}

interface Tooltip {
    text: string,
    styles?: TTStyles[],
}



export const tooltip: Directive<HTMLElement, Tooltip> = {
    mounted(el: HTMLElement, bind: DirectiveBinding<Tooltip>) {
        let cursorOnElement:boolean = false
        const div: HTMLDivElement = document.createElement('div');
        if (bind.value) {
            div.style.position = 'absolute';
            div.style.display = 'block';
            if(bind.value.styles){
                bind.value.styles?.forEach((styleCard:TTStyles) => {
                    div.style[styleCard.styleName] = styleCard.styleValue;
                })
            } else {
                div.style.padding = '5px 10px';
                div.style.backgroundColor = 'white';
                div.style.color = '#121212';
                div.style.border = '1px solid #121212';
            }

            div.innerHTML = bind.value.text
            el.addEventListener('mouseover', (ev: MouseEvent) => {
                cursorOnElement = true
                setTimeout(() => {
                    showTooltip(cursorOnElement, div, ev);
                }, 1000)
            })
            el.addEventListener('mouseout', () => {
                cursorOnElement = false
                div.remove()
            })
        }
    },
}


function showTooltip(cursorOnElement: boolean, div: HTMLDivElement, ev: MouseEvent) {
    if(cursorOnElement) {
        div.style.left = ev.clientX + 2 + 'px'
        div.style.top = ev.clientY + 5 + 'px'
        document.body.append(div)
    }
}
