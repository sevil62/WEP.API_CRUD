$(function () {

    function BringData(employees) {
        $('#employeeTable').find('tr').remove();
        $.each(employees, function (index, data) {
            $('#employeeTable').append(
                `<tr>
                        <td>${data.Title}</td>
                        <td>${data.FirstName}</td>
                        <td>${data.LastName}</td>
                        <td><button class='btn btn-sm btn-danger' value='Delete' id=${data.Id}>Delete</button></td>
                        <td><button class='btn btn-sm btn-warning' value='Update' id=${data.Id}>Update</button></td>
  
                </tr>`
            )
        })
    }
    
   // Aşağıdaki fonksiyon ile gelen data yı otomatik olarak text boxlara tek tek aldırmak demektir.

    function FetchData(employees) {
        $("#txtTitle").val(employees.Title);
        $("#txtFirstName").val(employees.FirstName);
        $("#txtLastName").val(employees.LastName);
    }

    //Çalışan Silme ve Güncelleme

    $("#employeeTable").on('click', 'button', function () {
        var currentValue = $(this).attr('value');
        var currentId = $(this).attr('id');
        var message = confirm('işlem yapmak istediğinize emin misiniz?')
        if (currentValue == 'Delete') {
            if (message) {
                $.ajax({
                    method: 'Delete',
                    url: 'https://localhost:44348/api/employees/' + currentId,
                    success: function (employees) {
                        BringData(employees);
                    }
                })
            }
            else {
                alert('iptal edildi!')
            }
        }
        else if (currentValue == 'Update') {
            if (message) {
                $.ajax({
                    method: 'Put',
                    url: 'https://localhost:44348/api/employees/',
                    data: { EmployeeID: currentId,Title: $("#txtTitle").val(), FirstName: $("#txtFirstName").val(), LastName: $("#txtLastName").val() },
                    success: function (employees) {
                        BringData(employees);
                    }
                })
            }
            else {
                alert('iptal edildi!')
            }
        }
    })

    //Çalışan Ekleme
    $("#btnAdd").click(function () {
        $.ajax({
            method: 'Post',
            url: 'https://localhost:44348/api/employees',
            data: { Title:$("#txtTitle").val(),FirstName: $("#txtFirstName").val(), LastName: $("#txtLastName").val() },
            success: function (employees) {
                BringData(employees);
            }
        })

    })

   

    //Api istek
    $("#getEmployee").click(function () {
        $.ajax({
            method: 'Get',
            url: 'https://localhost:44348/api/employees',
            success: function (employees) {
                BringData(employees);
            }
        })
    })



})