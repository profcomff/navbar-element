export default function createRipple(event) {
    const button = event.currentTarget;
    console.log(button);

    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    console.log(event.clientX, button.offsetLeft, radius);
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - radius}px`;
    circle.style.top = `${event.clientY - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}
