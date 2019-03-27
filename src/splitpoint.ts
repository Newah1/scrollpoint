

interface Options{
    absolute : boolean,
    style : string,
    split_element : HTMLElement,
    side: string,
}


class Splitpoint{
    public element : HTMLElement;
    public dup : HTMLElement;
    public options : Options;

    constructor(element : HTMLElement, options : Options){
        let defaults = {
            absolute: false,
            split_element: null,
            side : "top"
        }
        this.element = element;
        this.options = {...defaults, ...options};
        this.dup = this.generate_child();
        this.insert_child();
        
        window.addEventListener("scroll", () => { this.on_scroll(); });

        this.dup.className = this.element.className;
        this.dup.classList.add("splitpoint");

        this.clip_dup();        
    }

    private get_side(element : HTMLElement, side : string){
        return (<any>element.getBoundingClientRect())[side];
    }

    private on_scroll(){
        this.clip_dup();
    }    

    private clip_dup(){
        let element_bottom : number = this.get_side(this.element, "bottom");
        let split_point : number = this.get_side(this.options.split_element, this.options.side);
        if( element_bottom >= split_point ){

            let percent_in : number = this.calculate_percentage((element_bottom - split_point), this.dup.offsetHeight);
            
            
            percent_in = Math.round((percent_in - 100) * -1);
            //this.element.style.clipPath = `polygon(0 ${percent_in}%, 100%  ${percent_in}%, 100% 100%, 0% 100%)`;
            
            this.dup.style.clipPath = `polygon(0 ${percent_in}%, 100%  ${percent_in}%, 100% 100%, 0% 100%)`;
            
        } else{
            this.revert_clippath(this.dup);
        }
    }

    private revert_clippath(elem : HTMLElement){
        elem.style.clipPath = "polygon(0 /*bottom left */ 100%, 100% /*bottom right*/ 100%, 100% 100%, 0% 100%)";
    }

    private calculate_percentage (num1 : number, num2 : number) : number{
        return ( num1 / num2 ) * 100;
    }

    private set_amount_shown_from(direction : string, percentage : number, element : HTMLElement){
        
    }

    private insert_child() : boolean{
        this.element.appendChild(this.dup);
        return true;
    }

    private generate_child() : HTMLElement{
        let child_element : HTMLElement;
        child_element = document.createElement(this.element.tagName);
        child_element.innerHTML = this.element.innerHTML;
        child_element.style.clipPath = "polygon(0 /*bottom left */ 100%, 100% /*bottom right*/ 100%, 100% 100%, 0% 100%)";

        if(this.options.absolute){
            child_element.style.position = "absolute";
            child_element.style.top = "0";
            child_element.style.left = "0";
        }

        return child_element;
    }
}