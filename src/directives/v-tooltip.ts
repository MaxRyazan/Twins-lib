import {Directive, DirectiveBinding} from "vue";

interface TTStyles {
    [key: string] : string | number,
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
            setDefaultStyles(div);
            setCustomStyles(bind.value, div);
            setTooltipText(bind.value, div);

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

function setDefaultStyles(div: HTMLDivElement) {
    div.style.position = 'absolute';
    div.style.display = 'block';
    div.style.padding = '5px 10px';
    div.style.color = '#121212';
    div.style.border = '1px solid #121212';
    div.style.backgroundColor = 'white';
}

function setTooltipText(bindValue: Tooltip, div: HTMLDivElement) {
    if(typeof bindValue === 'string') {
        div.innerHTML = bindValue
    } else {
        div.innerHTML = bindValue.text
    }
}

function setCustomStyles(bindValue: Tooltip, div: HTMLDivElement) {
    if(bindValue.styles){
        bindValue.styles?.forEach((styleCard:TTStyles) => {
            for (const [key, value] of Object.entries(styleCard)) {
                div.style[key] = value;
            }
        })
    }
}