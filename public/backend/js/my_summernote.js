class SummerNote{
    constructor(summerNoteID) {
        this.config={};
        this.config.createRange={};
        this.summerNoteID=summerNoteID;
        this.mySummernote=$(summerNoteID+' textarea');
        var thisObj=this;

        thisObj.mySummernote.summernote({
            // placeholder: 'Hello stand alone ui',
            tabsize: 2,
            height: 400,
            fontSizes: ['12', '14', '16', '18', '24', '36', '48'],

            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],

                ['table', ['table']],
                ['insert', ['link', 'picture', 'video','hr']],
                ['view', ['fullscreen', 'codeview', 'help']],
                ['mybutton', ['imageModal']],
                ['fontsize', ['fontsize']]
            ],
            disableDragAndDrop:true,
            buttons: {
                imageModal: function (context) {
                    var ui = $.summernote.ui;
                    var button = ui.button({
                        className: 'editorImage',
                        contents: '<i class="note-icon-picture"></i>',
                        tooltip: 'Upload Images',
                        click: function (e) {

                            // console.log('click editor',this);
                            // if (e.target.classList.contains("editorImage") || e.target.parentElement.classList.contains("editorImage")) {
                            //     console.log("editorClick", e);
                            // }
                        }
                    });
                    return button.render();
                }
            },
            callbacks: {

                onFocus:function () {
                    // thisObj.config.createRange =$(thisObj.mySummernote).summernote('createRange');
                },
                onKeyup: function () {

                },
                onKeydown: function () {
                    thisObj.config.createRange =$(thisObj.mySummernote).summernote('createRange');


                } ,
                onPaste:function (e) {




                } ,
                onImageUpload: function () {

                },
                onBlur: function () {
                    // thisObj.config.createRange =$(thisObj.mySummernote).summernote('createRange');

                },
                onChange:function (e) {
                    // thisObj.config.createRange =$(thisObj.mySummernote).summernote('createRange');

                },
                onInit:function () {
                    document.querySelector(`${thisObj.summerNoteID} .note-editable`).addEventListener('click',function (e) {
                        thisObj.config.createRange =$(thisObj.mySummernote).summernote('createRange');

                    })

                }
            }
        });

        thisObj.mySummernote.summernote('removeFormat')
        thisObj.config.createRange =$(thisObj.mySummernote).summernote('createRange');

    }
}
