function showNotify(message, type) {
	$.notify({
		// options
		message: message,
		//icon: 'icon-checkmark fluent-ui fluent-ui-filled',
	}, {
		// settings
		element: 'body',
		//position: null,
		type: type,
		//allow_dismiss: true,
		//newest_on_top: false,
		showProgressbar: false,
		placement: {
			from: "bottom",
			align: "center"
		},
		offset: 20,
		spacing: 10,
		z_index: 9999,
		delay: 3300,
		timer: 1000,
		url_target: '_blank',
		mouse_over: null,
		animate: {
			enter: 'animate__animated animate__fadeInDown',
			exit: 'animate__animated animate__fadeOutRight'
		},
		onShow: null,
		onShown: null,
		onClose: null,
		onClosed: null,
		icon_type: 'class',
	});
}
$(document).ready(function () {
	

	//$('table.tableCayXanh').on('draw.dt', function () {
	//	$(".edit-delete-detail .material-symbols-rounded").addClass("filled");
	//})
	$('body').on('draw.dt', function () {
		$(".edit-delete-detail .material-symbols-rounded").addClass("filled");
	})

	//Tooltip
	$('table').on('draw.dt', function () {
		$('.detail-icon').attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "bottom")
		$('.edit-icon, .btn-download-update').attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "bottom").attr("title", "Cập nhật")
		$('.icon-download, .edit-download-icon').attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "bottom")
		$('.delete-icon').attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "bottom")
		$('.edit-folder-icon').attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "bottom")
		$('.icon-add-qr').attr("data-bs-toggle", "tooltip").attr("data-bs-placement", "bottom").attr("title", "Tạo mã QR")
		var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
		var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl)
		})

	});
	
	$(".modal").attr("data-bs-backdrop", "static")

	$(".modal").on('show.bs.modal', function () {
		$('.edit-delete-detail span').tooltip('hide')
		$('.tooltip').removeClass('show')
	})

	$('.titleMenu').empty()
	$('.title-area').appendTo('.titleMenu')
	$('.administrator').appendTo('#render-formLogin')
})
function showtooltip() {
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})
}
function reloadfillter(nameTable) {
	$(nameTable).DataTable().search('').draw();
}