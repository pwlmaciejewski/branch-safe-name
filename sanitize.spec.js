const sanitize = require('./sanitize')

describe('sanitize', () => {
    describe('output', () => {
        // https://stackoverflow.com/questions/3651860/which-characters-are-illegal-within-a-branch-name
        it('allow "/" char', () => {
            const output = sanitize('foo/bar')
            expect(output).toBe('foo/bar')
        })

        it('should remove dot from "/."', () => {
            const output = sanitize('foo/.bar/.baz')
            expect(output).toBe('foo/bar/baz')
        })

        it('should separate ".lock" at the end of the slash separated sequence', () => {
            const output = sanitize('foo.lock.foo/bar.lock/baz.lock', '+')
            expect(output).toBe('foo.lock.foo/bar+lock/baz+lock')
        })

        it('should separate ".."', () => {
            const output = sanitize('foo..bar...baz', '+')
            expect(output).toBe('foo+bar+.baz')
        })

        it('should separate ".." and remove dot from "/."', () => {
            const output = sanitize('foo...bar', '/')
            expect(output).toBe('foo/bar')
        })

        it('should separate ".." and remove dot from ".lock"', () => {
            const output = sanitize('foo...lock', '/')
            expect(output).toBe('foo/lock')
        })

        it('should remove "~"', () => {
            const output = sanitize('foo~~/~bar', '+')
            expect(output).toBe('foo/bar')
        })

        it('should remove "^"', () => {
            const output = sanitize('foo^^/^bar', '+')
            expect(output).toBe('foo/bar')
        })

        it('should remove ":"', () => {
            const output = sanitize('foo::bar', '+')
            expect(output).toBe('foobar')
        })

        it('should separate space', () => {
            const output = sanitize('foo bar baz', '/')
            expect(output).toBe('foo/bar/baz')
        })

        it('should use one separator to replace multiple spaces', () => {
            const output = sanitize('foo   bar', '/')
            expect(output).toBe('foo/bar')
        })

        it('should replace "\"', () => {
            const output = sanitize('foo\\bar', '+')
            expect(output).toBe('foobar')
        })

        it('should remove ".." at the end of the input', () => {
            const output = sanitize('foo....bar..', '/')
            expect(output).toBe('foo/bar')
        })

        it('should remove "@{"', () => {
            const output = sanitize('foo@{@{bar')
            expect(output).toBe('foobar')
        })

        it('should remove "?"', () => {
            const output = sanitize('foo??bar')
            expect(output).toBe('foobar')
        })

        it('should remove "*"', () => {
            const output = sanitize('foo**bar**')
            expect(output).toBe('foobar')
        })

        it('should remove "["', () => {
            const output = sanitize('foo[[bar[')
            expect(output).toBe('foobar')
        })

        it('should collapse multiple "/"', () => {
            const output = sanitize('foo//  bar / baz', '/')
            expect(output).toBe('foo/bar/baz')
        })

        it('should remove separator at the beginning of the section', () => {
            const output = sanitize('foo/  bar', '+')
            expect(output).toBe('foo/bar')
        })
    })

    describe('separator', () => {
        it('should throw on space separator', () => {
            expect(() => {
                sanitize('foo', 'bar ')
            }).toThrow()
        })

        it('should throw on ".." separator', () => {
            expect(() => {
                sanitize('foo', 'bar..')
            }).toThrow()
        })

        it('should throw on "~" separator', () => {
            expect(() => {
                sanitize('foo', 'bar~')
            }).toThrow()
        })

        it('should throw on "^" separator', () => {
            expect(() => {
                sanitize('foo', 'bar^')
            }).toThrow()
        })

        it('should throw on ":" separator', () => {
            expect(() => {
                sanitize('foo', 'bar:')
            }).toThrow()
        })

        it('should throw on "?" separator', () => {
            expect(() => {
                sanitize('foo', 'bar?')
            }).toThrow()
        })

        it('should throw on "*" separator', () => {
            expect(() => {
                sanitize('foo', 'bar*')
            }).toThrow()
        })

        it('should throw on "[" separator', () => {
            expect(() => {
                sanitize('foo', 'bar[')
            }).toThrow()
        })

        it('should throw on "@" separator', () => {
            expect(() => {
                sanitize('foo', 'bar@')
            }).toThrow()
        })
    })
})
