successHandler();
function successHandler(){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/group1/`,
        success: function (data){
            let content = "";
            for (let i=0; i<data.length; i++)
                content += getGroupInfo(data[i])
            document.getElementById("showGroupList").innerHTML = content;
        }
    });
}

function getGroupInfo(group1){
    return `<tr>
<td>${group1.name}</td>
<td><img src="${'http://localhost:8080/image/' + group1.backGroundUrl}" width="100px"></td>
<td><button type="button" onclick="showUpdateForm(${group1.id})">Update</button> </td>
<td><button type="button" onclick="removeGroup(${group1.id})">Remove</button> </td>
</tr>`
}

function createNewGroup(){
    let name = $(`#name`).val();
    let backgroundImage = $(`#backgroundImage`);
    let groupForm = new FormData();
    groupForm.append('groupName1',name);
    groupForm.append('backGroundUrl',backgroundImage.prop('files')[0]);
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: groupForm,
        url:`http://localhost:8080/group1`,
        success: function(){
            $(`#name`).val(null)
            $(`#backgroundImage`).val(null)
            successHandler();
        }
    });
    event.preventDefault();
}

function removeGroup(id){
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:8080/group1/${id}`,
        success: function () {
            alert("xoa roi");
            successHandler();
        }
    })
    // event.preventDefault();
}
successHandler();
function showUpdateForm(id){
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/group1/${id}`,
        success: function (data){
            let content = `<h2>Update a group</h2>
    <form>
        <table>
            <tr>
                <td>Name:</td>
                <td><input id="editName" type="text" value="${data.groupName1}"></td>
            </tr>
            <tr>
                <td>Background Image: </td>
                <td><img src="${'http://localhost:8080/image/' + data.backGroundUrl}" width="100px"> </td>
                <td><input id="editImage" type="file"></td>             
            </tr>
            <tr>               
                <td><input type="button" onclick="updateGroup(${data.id})" value="Update group information"></td>
            </tr>
        </table>
    </form>`;
            document.getElementById("updateGroupInfo").innerHTML = content;
        }
    });
}



function updateGroup(id){
    let name = $(`#editName`).val();
    let backgroundImage = $(`#editImage`);
    let groupForm = new FormData();
    groupForm.append('groupName1',name);
    let imageTest = backgroundImage.prop('files')[0];
    if (imageTest === undefined){
        let file = new File([""],"Cat03.jpg");
        groupForm.append("backGroundUrl",file);
    }else{
        groupForm.append("backGroundUrl",imageTest);
    }
    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: groupForm,
        url: `http://localhost:8080/group1/${id}`,
        success: successHandler
    });
    event.preventDefault();
}