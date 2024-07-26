import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Application } from '@splinetool/runtime';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  xValue:any;
  yValue:any;
  reached:boolean=false
  ngOnInit(): void {

    const line:any = document.getElementById('line');
    let isDrawing = false;
    let startX:any, startY:any;

    document.addEventListener('mousedown', (event) => {
        isDrawing = true;
        startX = 0; // Get initial mouse X position
        startY = 100; // Get initial mouse Y position
        // line.style.width = '0'; // Reset line width
        line.style.left = `${startX}px`; // Position line at mouse X
        line.style.top = `${startY}px`; // Position line at mouse Y
    });

    document.addEventListener('mousemove', (event) => {
        if (isDrawing) {
            const currentX = event.clientX; // Get current mouse X position
            const currentY = event.clientY; // Get current mouse Y position

            const distance = Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2); // Calculate distance
            line.style.width = `${distance}px`; // Set line width based on distance

            const angle = Math.atan2(currentY - startY, currentX - startX) * (180 / Math.PI); // Calculate angle
            line.style.transform = `rotate(${angle}deg)`; // Rotate line based on angle
        }
    });

    document.addEventListener('mouseup', () => {
        isDrawing = false; // Stop drawing on mouse up
    });













    let box:any = document.getElementById("box");
    if(box){
      addEventListener('click',(event)=>{
        box.style.visibility="visible";
        box.left = event.pageX;
        box.top = event.pageY;
        this.getXandY(box.left,box.top)
      });
    }

  }
  getXandY(x:any,y:any){
    this.reached=!this.reached
    this.xValue=x;
    this.yValue=y;
    console.log(this.xValue,this.yValue)
  }
  ngAfterViewInit(): void {
    let canvas:any = document.getElementById('canvas3d');

    if(canvas){
      const spline = new Application(canvas);
      spline.load('https://prod.spline.design/AFz9HaZQVNBnmZsO/scene.splinecode')

    }
  }
  title = 'splineCheck';
}
