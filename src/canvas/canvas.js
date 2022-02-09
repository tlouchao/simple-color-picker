export const drawCanvasBg = (state) => {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    const gradGrey = ctx.createLinearGradient(0,0,0,canvas.height)
    gradGrey.addColorStop(0,"white")
    gradGrey.addColorStop(1,"black")

    ctx.fillStyle = gradGrey;
    ctx.fillRect(0,0,canvas.width, canvas.height);

    const gradHue = ctx.createLinearGradient(0,0,canvas.width, 0)
    gradHue.addColorStop(0, `hsla(${state[0]}, ${state[1]}%, ${state[2]}%, 0)`)
    gradHue.addColorStop(1, `hsla(${state[0]}, ${state[1]}%, ${state[2]}%, 1)`)

    ctx.fillStyle = gradHue;
    ctx.globalCompositeOperation = "multiply";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
}