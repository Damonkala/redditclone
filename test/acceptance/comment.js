'use strict';

var cp = require('child_process');
var chai = require('chai');
var expect = chai.expect
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../../app');
var Comment = require('../../models/comment');
var User = require('../../models/user');
var Post = require('../../models/post');

var dbName = process.env.MONGO_URL.split('/').pop();

var testUser;

var cleanDb = function(done) {
  cp.execFile('./clean-db.sh', [dbName], {cwd: __dirname + '/../scripts/'}, function(){
    User.findById('0000000000000000000000a1', function(err, FriskyBiznu){
      testUser = FriskyBiznu;
      done();
    });
  });
};
var addToPost = function(commentId){
  Post.findById('000000000000000000000002', function(err, post) {
    if(err || !post) return res.status(400).send({err: 'Post not found.'});
    post.comments.push(commentId);
    post.save(function(err, savedPost) {
      res.status(err ? 400 : 200).send(err || savedPost);
    });
  });
}
var addToComment = function(commentId){
  Comment.findById('0000000000000000000000c1', function(err, comment) {
    if(err || !comment) return res.status(400).send({err: 'Comment not found.'});
    comment.comments.push(commentId);
    comment.save(function(err, savedComment) {
      res.status(err ? 400 : 200).send(err || savedComment);
    });
  });
}
describe('Comment route', function() {
	beforeEach(cleanDb)
	describe('Write Comment on post', function(done) {
			it('Write Comment and add to a post.', function(done){
				var token = testUser.token();
				chai.request(app)
				.post('/comments/new')
				.set('Authorization', `Bearer ${token}`)
				.send({
					user: 'FriskyBiznu',
					content:'What did i tell you?'
				})
				.end(function(err, res){
					expect(res.body._id).to.be.ok;
					expect(err).to.be.null;
					expect(res).to.have.status(200)
          addToPost(res.body._id);
					done();
			})
		})
	})
	describe('Write Comment on comment', function(done) {
			it('should write a reply comment.', function(done){
        var token = testUser.token();
				chai.request(app)
				.post('/comments/new')
        .set('Authorization', `Bearer ${token}`)
				.send({
					user: 'FriskyBiznu',
					content:'What did i tell you?'
				})
				.end(function(err, res){
					expect(res.body._id).to.be.ok;
					expect(err).to.be.null;
					expect(res).to.have.status(200)
          addToComment(res.body._id)
					done();
			})
		})
	})
	describe('Delete comment', function(done) {
			it('should Delete a comment.', function(done){
				chai.request(app)
				.delete('/comments')
				.send({id: '566fa22fb6fe848aeaaadf05'})
				.end(function(err, res){
					expect(err).to.be.null;
					expect(res).to.have.status(200)
					done();
			})
		})
	})
})
