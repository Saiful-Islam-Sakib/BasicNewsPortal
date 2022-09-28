class posts{
    constructor(postid,posttitle,description, creationDate, userid){
        this.postid = postid; 
        this.posttitle = posttitle; 
        this.description = description;
        this.creationDate = creationDate;
        this.userid = userid;
    }
}

module.exports = posts;
