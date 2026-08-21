// Polyfills for Web APIs that jest's jsdom environment lacks but msw v2 requires.
const { TextEncoder, TextDecoder } = require('util');
const { ReadableStream, TransformStream, WritableStream } = require('stream/web');
const { BroadcastChannel } = require('worker_threads');

// undici reads TextEncoder/TextDecoder at import time, so define them first.
Object.assign(global, {
  TextEncoder,
  TextDecoder,
  ReadableStream,
  TransformStream,
  WritableStream,
  BroadcastChannel,
});

const { fetch, Headers, Request, Response, FormData } = require('undici');

Object.assign(global, { fetch, Headers, Request, Response, FormData });
