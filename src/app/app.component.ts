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
    let startX:any=0, startY:any=100;
    line.style.left = `${startX}px`; // Position line at mouse X
    line.style.top = `${startY}px`;
    line.style.width = '100px';
    document.addEventListener('mousedown', (event) => {
        isDrawing = true;
        startX = 0; // Get initial mouse X position
        startY = 100; // Get initial mouse Y position
        // line.style.width = '10px'; // Reset line width
        line.style.left = `${startX}px`; // Position line at mouse X
        line.style.top = `${startY}px`; // Position line at mouse Y
    });

    // document.addEventListener('mousemove', (event) => {
    //     if (isDrawing) {
    //         const currentX = event.clientX; // Get current mouse X position
    //         const currentY = event.clientY; // Get current mouse Y position

    //         const distance = Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2); // Calculate distance
    //         line.style.width = `${distance}px`; // Set line width based on distance

    //         const angle = Math.atan2(currentY - startY, currentX - startX) * (180 / Math.PI); // Calculate angle
    //         line.style.transform = `rotate(${angle}deg)`; // Rotate line based on angle
    //     }
    // });

    // document.addEventListener('mouseup', () => {
    //     isDrawing = false; // Stop drawing on mouse up
    // });













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

  }

  onRadioButtonClick(event:any){
    const radioButton = event.target;
    const rect = radioButton.getBoundingClientRect();
    const line:any = document.getElementById('line');
    // Create the overlay element
    const overlay = document.createElement('div');
    let currentY = rect.top -70
    let currentX = rect.left-10
    overlay.className = 'overlay';
    overlay.style.top = `${rect.top -70}px`;
    overlay.style.left = `${rect.left-90}px`;
    overlay.style.position = 'fixed';
    overlay.style.width = `${rect.width +150}px`;
    overlay.style.height = `${rect.height +100}px`;
    overlay.style.zIndex = '1000';
    overlay.style.backgroundImage=` url('assets/thread.gif')`
    overlay.style.backgroundSize='cover';

    const distance = Math.sqrt((rect.left - 70) ** 2 + (rect.top - 0) ** 2); // Calculate distance

     line.style.width = `${distance}px`
     const angle = Math.atan2(currentY - 85, currentX - 0) * (180 / Math.PI); // Calculate angle
            line.style.transform = `rotate(${angle}deg)`;
    setTimeout(() => {

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // document.addEventListener('click', (event) => {
    //   console
    // });

    // document.addEventListener('mousemove', (event) => {
    //   isDrawing=true
    //     if (isDrawing) {
    //         const currentX = event.clientX; // Get current mouse X position
    //         const currentY = event.clientY; // Get current mouse Y position

    //         const distance = Math.sqrt((currentX - startX) ** 2 + (currentY - startY) ** 2); // Calculate distance
    //         line.style.width = `${distance}px`; // Set line width based on distance

    //         const angle = Math.atan2(currentY - startY, currentX - startX) * (180 / Math.PI); // Calculate angle
    //         line.style.transform = `rotate(${angle}deg)`; // Rotate line based on angle
    //     }
    // });

    // document.addEventListener('mouseup', () => {
    //     isDrawing = false; // Stop drawing on mouse up
    // });



    // Remove the overlay after 2 seconds
    setTimeout(() => {
      overlay.style.opacity = '1';
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 500); // Allow time for the fade-out transition
    }, 1600);
    }, 1000);
  }
}
