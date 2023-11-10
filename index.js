"use strict";

const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

const olhoIn = new Image();
olhoIn.src = "olhoIn.png";
const olhoOut = new Image();
olhoOut.src = "olhoOut.png";

let olhoEscolhido = olhoOut;

let tam = 0;
let arcRadius = 0;

let pointerX = null;
let pointerY = null;

canvas.addEventListener("pointermove", (event) => {
	movePointerXY(event);
	olhoEscolhido = olhoIn;
});

canvas.addEventListener("pointerdown", (event) => {
	movePointerXY(event);
	olhoEscolhido = olhoIn;
});

function movePointerXY(event) {
	pointerX = event.x;
	pointerY = event.y;
}

canvas.addEventListener("pointerleave", () => {
	olhoEscolhido = olhoOut;
});

window.addEventListener("resize", () => {
	innerWidth = Math.floor(window.innerWidth - 0.1);
	innerHeight = Math.floor(window.innerHeight - 0.1);
	console.log("resize ok", innerWidth + "w", innerHeight + "h");
	resizeCanvas(canvas);
});

window.onload = () => {
	resizeCanvas(canvas);
};

let innerWidth = Math.floor(window.innerWidth - 0.1);
let innerHeight = Math.floor(window.innerHeight - 0.1);

function resizeCanvas(canvas) {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	if (innerWidth <= 600) {
		tam = 0.275 * canvas.width;
		arcRadius = 0.4 * canvas.width;
	} else if (innerWidth <= 1024) {
		tam = 0.2 * canvas.width;
		arcRadius = 0.3 * canvas.width;
	} else {
		tam = 0.135 * canvas.width;
		arcRadius = 0.225 * canvas.width;
	}
}

function animate() {
	let temp_x, temp_y;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();

	/* rosto */
	temp_x = canvas.width / 2;
	temp_y = canvas.height / 2;
	ctx.translate(temp_x, temp_y);
	ctx.arc(0, 0, arcRadius, 0, Math.PI * 2, false); // novo arco na origem (0, 0) após a translação
	ctx.stroke();

	ctx.restore();
	ctx.save();

	/* olho 1 */
	temp_x = canvas.width / 2 - tam / 2;
	temp_y = canvas.height / 2 - 50;

	ctx.translate(temp_x, temp_y); // move a origem do canvas para o centro dele
	ctx.rotate(normalizeAngle(temp_x, temp_y, pointerX, pointerY)); // rotaciona o canvas
	ctx.drawImage(olhoEscolhido, -tam / 2, -tam / 2, tam, tam); // faz o centro da imagem ficar alinhado com a (nova) origem do canvas

	ctx.restore();
	ctx.save(); // extremamente importante

	/* olho 2 */
	temp_x = canvas.width / 2 + tam / 2;
	temp_y = canvas.height / 2 - 50;

	ctx.translate(temp_x, temp_y);
	ctx.rotate(normalizeAngle(temp_x, temp_y, pointerX, pointerY));
	ctx.drawImage(olhoEscolhido, -tam / 2, -tam / 2, tam, tam);

	ctx.restore();

	requestAnimationFrame(animate);
}

function normalizeAngle(x1, y1, x2, y2) {
	const dx = x2 - x1;
	const dy = y2 - y1;
	return Math.atan2(dy, dx);
}

requestAnimationFrame(animate);
