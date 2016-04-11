$(function() {

    ringgit = function (duit) {
        return duit.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }

    rounded = function (num) {
        return +(Math.round(num + "e+2") + "e-2");
    }

    bulan = function (m) {
	    var b = ['', 'Januari', 'Febuari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
	    return b[m];
	}

    $('[data-toggle="tooltip"]').tooltip();


    $('#gred').on('change', function() {
        $('#kgt').val(this.value);
    });

    $('#reset').on('click', function() {
        $('#gaji30jun, #gaji1julai, #kgt1julai').text('RM 0.00').animate({
            fontSize: '18px'
        }, 1000);

        $(':input', '#pengiraan-kgt')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');

         $('#gaji-hakiki').focus();
    });

    $('form').on('change', '#gaji-max', function() {

        if ($(this).is(':checked')) {
            $('#kgt').val(rounded(parseFloat($('#gaji-hakiki').val()) * (3 / 100)));
            $('#collapseMaxSalary').collapse('show')
        } else {
            $('#kgt').val($('#gred').val());
            $('#collapseMaxSalary').collapse('hide')
        }

    });

    $('#gaji-hakiki').on('input', function() {
        $('#required').removeClass('has-error');
        if (!isNaN($(this).val()) || $(this).val() != '') {
            $('#gaji-max').prop("disabled", false);
        } else {
            $('#gaji-max').prop("disabled", true);
        }
    });

    $('#kira').on('click', function() {

        var gajiHakiki = parseFloat($('#gaji-hakiki').val()),
            kgt = parseFloat($('#kgt').val()),
            tpg = parseFloat($('#tpg').val()),
            gaji30jun = 0,
            gaji1julai = 0;

        if (isNaN(gajiHakiki) || gajiHakiki == '') {
            $('.required')
            	.addClass('has-error')
            	.find('span.help-block')
            	.removeClass('hidden');
        } else {
            $('.required')
            	.removeClass('has-error')
            	.find('span.help-block')
            	.addClass('hidden');
        }

        if ($('#gaji-max').is(':checked')) {
            kgt = gajiHakiki * (3 / 100);
        }

        gaji30jun = gajiHakiki;

        if (tpg < 7) {
        	gaji30jun = rounded(gajiHakiki + kgt);
        	gaji1julai = rounded(gaji30jun + kgt);
        } else {
        	gaji1julai = rounded(gaji30jun + (kgt*2));
        }

        //$("#bulan-kgt").replaceWith($('#bulan-kenaikan').val());

        $('html, body').animate({
	        scrollTop: $("#result").offset().top
	    }, 500);

        if (isNaN(gaji30jun)) {
            $('#gaji30jun, #gaji1julai').text('RM 0.00');
        } else {
            $('#gaji30jun').text("RM " + gaji30jun.toLocaleString('ms'));
            $('#gaji1julai').text("RM " + gaji1julai.toLocaleString('ms'));

            $('#gaji30jun, #gaji1julai').animate({
                fontSize: "32px"
            }, 1000);
        }

    });

});
