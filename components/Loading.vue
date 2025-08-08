<template>
	<div class="loading-box">
		<div class="spinner">
			<div />
			<div />
			<div />
			<div />
			<div />
		</div>
	</div>
</template>
<style scoped lang="less">
.spinner {
	position: relative;
	width: 80px;
	height: 16px;
}

.spinner div {
	position: absolute;
	width: 16px;
	height: 16px;
	background-color: #056f33;
	border-radius: 50%;
	animation: spinner-4t3wzl 2s infinite linear;
}

.spinner div:nth-child(1) {
	left: 0;
	animation-delay: 0.15s;
	background-color: rgba(5, 111, 51, 0.9);
}

.spinner div:nth-child(2) {
	left: 25%;
	animation-delay: 0.3s;
	background-color: rgba(5, 111, 51, 0.8);
}

.spinner div:nth-child(3) {
	left: 50%;
	animation-delay: 0.45s;
	background-color: rgba(5, 111, 51, 0.7);
}

.spinner div:nth-child(4) {
	left: 75%;
	animation-delay: 0.6s;
	background-color: rgba(5, 111, 51, 0.6);
}

.spinner div:nth-child(5) {
	left: 100%;
	animation-delay: 0.75s;
	background-color: rgba(5, 111, 51, 0.5);
}

@keyframes spinner-4t3wzl {
	0% {
		transform: rotate(0deg) translateX(-100%);
	}

	100% {
		transform: rotate(360deg) translateX(-100%);
	}
}

.loading-box {
	min-height: 500px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
