
document.querySelectorAll('a.yakor').forEach(link => {
	link.addEventListener('click', function (e) {
		e.preventDefault()

		const href = this.getAttribute('href').substring(1)
		const scrollTarget = document.getElementById(href)
		const topOffset = 90
		const elementPosition = scrollTarget.getBoundingClientRect().top
		const offsetPosition = elementPosition - topOffset
		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth',
		})
	})
})

$(document).ready(function () {
	$('.header__burger').click(function () {
		$('.header__burger,.header__nav').toggleClass('active__burger');
		$('body').toggleClass('lock');
	})
})


