manywho.graph.ajax = (function () {

    return {

        getFlowGraph: function (flowId)  {

            $.ajax({
                url: 'https://flow.manywho.com/api/draw/1/graph/flow/' + flowId,
                type: 'GET',
                dataType: 'json',
                contentType: 'application/json',
                processData: true,
                beforeSend: function (xhr) {

                    xhr.setRequestHeader('Authorization', 'ManyWhoTenantId%3D95c16540-fcc0-4c47-9297-e7a6e1ba2416%26ManyWhoUserId%3D5fdecb75-9fb4-4095-8cac-fdde2bf6b7f4%26ManyWhoToken%3DQ2FuRWRpdEZsb3dzPVRydWUmQ2FuTWFuYWdlRmxvd3M9VHJ1ZSZTdGF0dXM9QVVUSEVOVElDQVRFRCZNYW55V2hvVGVuYW50SWQ9OTVjMTY1NDAtZmNjMC00YzQ3LTkyOTctZTdhNmUxYmEyNDE2Jk1hbnlXaG9Vc2VySWQ9NWZkZWNiNzUtOWZiNC00MDk1LThjYWMtZmRkZTJiZjZiN2Y0Jk1hbnlXaG9Ub2tlbj1EVU1NWSZEaXJlY3RvcnlJZD1Aam9hb21vcmVpcmEubWFueXdoby5jb20mRGlyZWN0b3J5TmFtZT1Aam9hb21vcmVpcmEubWFueXdoby5jb20mRW1haWw9am9hby5tb3JlaXJhQG1hbnl3aG8uY29tJklkZW50aXR5UHJvdmlkZXI9QG1hbnl3aG8uY29tJlRlbmFudE5hbWU9QGpvYW9tb3JlaXJhLm1hbnl3aG8uY29tJlRva2VuPURVTU1ZJlVzZXJuYW1lPWpvYW8ubW9yZWlyYUBqb2FvbW9yZWlyYS5tYW55d2hvLmNvbSZVc2VySWQ9NWZkZWNiNzUtOWZiNC00MDk1LThjYWMtZmRkZTJiZjZiN2Y0JkZpcnN0TmFtZT1Kb2FvJkxhc3ROYW1lPU1vcmVpcmE%253D%26DirectoryId%3D%40joaomoreira.manywho.com%26DirectoryName%3D%40joaomoreira.manywho.com%26Email%3Djoao.moreira%40manywho.com%26IdentityProvider%3D%40manywho.com%26TenantName%3D%40joaomoreira.manywho.com%26Token%3DDUMMY%26Username%3Djoao.moreira%40joaomoreira.manywho.com%26UserId%3D5fdecb75-9fb4-4095-8cac-fdde2bf6b7f4%26FirstName%3DJoao%26LastName%3DMoreira3DMoreira');

                }
            }).done(function (data) {

                document.getElementById('flow-title').innerHTML = data.developerName;
                document.getElementById('flow-description').innerHTML = data.developerSummary;
                manywho.graph.setModel(data.mapElements);
                manywho.graph.render();

            })

        }
    }

})(manywho);