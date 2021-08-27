"use strict";
// jest.mock( "../src/calc" );

// Load env variables for db connection info
const dotenv = require('dotenv');
dotenv.config();

// Our DB Configuration
require('../../src/database');

// Load source code
const Video = require('../../src/models/video.model');
const videoController = require('../../src/controller/video.controller');
const { getVideoInfo } = require('../../src/controller/video.utils');

// clear database
Video.remove({}).exec();
console.log("Video collection removed");

describe("Video Utils", () => {
  it("should return video title", (done) => {
    const sampleVideoInfo = {
    }
    const videoInfo = getVideoInfo("");
    console.log(videoInfo);
    expect(Object.keys(videoInfo)).toEqual(Object.keys(sampleVideoInfo));
  });
})

describe("Video Controller", () => {
  /*
  beforeAll(async () => {
    console.log("beforeAll executes once before all tests");    
  });

  afterAll(async () => {
    console.log("afterAll executes once after all tests");
  });
  */

  describe("video CRUD", () => {
    /*
    beforeEach(() => {
      console.log("beforeEach executes before every test");
    });
    */

    it("should get no videos", (done) => {
      return videoController.getAllVideos().then(result => {
        expect(result.success).toBe(true);
        expect(result.data.length).toBe(0);
        done();
      })
    });

    it("should create one video", (done) => {
      const sampleCreateResponse = {
        "_id": "6123f91fb9d95a008f12ee52",
        "title": "Falling Down - Not Economically Viable (1080p)",
        "uploader": "JackBauer137",
        "date": "2021-08-23T19:38:07.908Z",
        "duration": 114,
        "link": "T_17vRAsbOs",
        "localPath": "/usr/src/app/src/videos/Falling Down - Not Economically Viable (1080p)__T_17vRAsbOs.mp4",
        "__v": 0
      }
      return videoController.createVideo("T_17vRAsbOs").then(result => {
        expect(result.success).toBe(true);
        expect(Object.keys(result.data)).toEqual(Object.keys(sampleCreateResponse));
        return videoController.getAllVideos().then(result => {
          expect(result.success).toBe(true);
          expect(result.data.length).toBe(1);
          done();
        })
      })
    });

    it("should get one video", (done) => {
      const sampleGetResponse = {
        "_id": "6123f91fb9d95a008f12ee52",
        "title": "Falling Down - Not Economically Viable (1080p)",
        "uploader": "JackBauer137",
        "date": "2021-08-23T19:38:07.908Z",
        "duration": 114,
        "link": "T_17vRAsbOs",
        "localPath": "/usr/src/app/src/videos/Falling Down - Not Economically Viable (1080p)__T_17vRAsbOs.mp4",
        "__v": 0
      }
      return videoController.getVideo("T_17vRAsbOs").then(result => {
        expect(result.success).toBe(true);
        expect(Object.keys(result.data)).toEqual(Object.keys(sampleGetResponse));
        done();
      })
    });

    it("should delete one video", (done) => {
      return videoController.deleteVideo("T_17vRAsbOs").then(result => {
        expect(result.success).toBe(true);
        // expect(Object.keys(result.data)).toEqual(Object.keys(sampleGetResponse));
        videoController.getVideo("T_17vRAsbOs").then(result => {
          expect(result.success).toBe(false);
          done();
        });
      })
    });
  });
});