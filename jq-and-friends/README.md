jq and friends
==============

> Like awk, but for JSON


JSON
----

<https://www.json.org/>

* `1`
* `null`
* `"json"`
* `[ {"a":-13.37e42}, true ]`

[ 1, null, "json", { "a": -13.37 }, true ]

1 null "json" { "a": -13.37 } true

jq
--

   <https://jqlang.org/>     <https://github.com/jqlang/jq>
<https://jqlang.org/manual/> <https://jqlang.org/tutorial/>

Try it online: https://play.jqlang.org/

Docker: `ghcr.io/jqlang/jq`

Single C binary without runtime dependencies

A jq program is a "filter"


Simple filters
--------------

`.` "pretty-print" (identity filter)

    printf '1 2 4 {"obj":"ect"} ["hooray","array"]' | jq '.'

`.foo` access object members

    printf '{"foo":"bar","baz":[1,2,3]}' | jq '.baz'

`.[m:n]` slice arrays

    printf '[false, 1, "two", [3], {"four":null}]' | jq '.[-1:]'

`.[]` iterate arrays and object values

    printf '[1,2,{},null,"five"]' | jq '.[]'

`,` duplicate input

    printf '"value"' | jq '., length'

`|` combine filters

    printf '{"foo":[13,37,42]}' | jq '.foo | .[2]'

`?` suppress errors

    printf '["not","an","object"]' | jq '.foo?'


Curling data
------------

Extract top emails from curl response:

    curl https://jsonplaceholder.typicode.com/users \
        | jq -r '.[].email'
        | sort \
        | head

Extract name and body of comments of post 100, sorted by author email:

    curl https://jsonplaceholder.typicode.com/comments \
        | jq -c '
          sort_by(.email)
          | map(select(.postId == 100))
          | map({name, body})
          | .[]
        '


Constructing JSON
-----------------

Valid JSON is a valid jq filter (quoting keys is optional):

    jq -n '[{foo:["bar"]}]'

Interpolate parameters:

    jq -n --arg name Jason --argjson years 42 '{$name, age:$years, movie:"The Transporter"}'

Wrap plain text:

    printf 'this is a\nmultiline text' | jq -Rs '{message:.}'


Similar projects and related tools
----------------------------------

* [`jaq`](https://github.com/01mf02/jaq): A jq clone focussed on correctness, speed, and simplicity
* [`yq`](https://github.com/mikefarah/yq): yq is a portable command-line YAML, JSON, XML, CSV, TOML and properties processor
* [`fx`](https://github.com/antonmedv/fx): Terminal JSON viewer & processor
* [`gron`](https://github.com/tomnomnom/gron): Make JSON greppable!
* [`httpie`](https://github.com/httpie/cli): modern, user-friendly command-line HTTP client for the API era

-----

(NOTE: Most of the following was not part of the live workshop, but it can still serve as a reference)

Recap
-----

* `.` "pretty-print" (identity filter)
* `.foo` access object members
* `.[]` iterate arrays and object values
* `|` combine filters


Controlling IO
--------------

### CLI flags

`-s` slurp inputs into an array

    printf '1 "two" [3] {"four": "55555"}' | jq -s '.'

`-R` read raw lines

    printf 'line 1\nline2\n' | jq -R '{content:., length:length}'

`-Rs` (`-R -s`) read full input as single string

    printf 'line 1\nline2\n' | jq -Rs '{content:., length:length}'

`-c` compact output ("ndjson")

    printf '1 [2,3,4] {"name":"Jason", "age":42}' | jq -c '.'

`-r` don't quote top-level string objects

    printf '{"name":"Jason", "age":42}' | jq -r '.name'

`-n` don't read input, but call filter once with `null`

    jq -n '{name:"Jason",age:42,input:.}'

### Filters

`input` produce the next input (i.e. JSON object)

    printf '1 2 3 4' | jq -c '[., input]'

`inputs` produce all remaining inputs

    printf '1 2 3' | jq '{first: ., rest: [inputs]}'


Assignments
-----------

`=` plain assignment (same input)

    printf '{"one":1,"two":2}' | jq '.two = 22'

    printf '{"one":1,"two":2}' | jq '.three = 3'

    printf '{"one":1,"two":2}' | jq '.nested = .'

    printf '{"one":1,"two":2}' | jq '.[] = 42'

`|=` update assignment (LHS is input to RHS)

    printf '{"one":1,"two":2}' | jq '.two |= .+40'

    printf '{"one":1,"two":2}' | jq '.[] |= [.]'

`x *= y` is equivalent to `x |= . * y`:

    printf '{"one":1,"two":2}' | jq '.two *= 21'


Transforming arrays and objects
-------------------------------

`map` apply filter to each element of an iterable

    printf '1 2 3' | jq -s 'map(.*.)'

    printf '{"one":1,"two":2}' | jq 'map(.*.)'

`map(f)` is identical to `[.[]|f]`

    printf '[1,2,3]' | jq '[.[]|.+.]'

`map_values` apply filter to each value of an object

    printf '{"one":1,"two":2}' | jq 'map_values(.*.)'

    printf '{"one":1,"two":2}' | jq 'map_values([.])'

`select` drop inputs not matching condition ("falsy")

    printf '[1,2,3]' | jq 'map(select(.>1))'

    printf '{"one":1,"two":2}' | jq 'map_values(select(.>1))'

`to_entries` convert object into key-value pairs (`{"key":…,"value":…}`)

    printf '{"one":1,"two":2}' | jq 'to_entries'

`from_entries` build object from key-value pairs

    printf '[{"key":"one", "value":1},{"key":"two","value":2}]' | jq 'from_entries'

`with_entries` apply filter on key-value pairs of object

    printf '{"one":1,"two":2}' | jq 'with_entries(.key|=.+.)'

`with_entries(f)` is identical to to `to_entries | map(f) | from_entries'`

    printf '{"one":1,"two":2}' | jq 'to_entries | map(.key*=2) | from_entries'

Fan out objects:

    printf '{"name":"Jason","movies":["The Transporter","The Beekeeper"]}' | jq '{movie:.movies[],actor:.name}'


Custom functions
----------------

Define functions with `def name: …;`

Functions act as regular filters:

    printf '
        {"id":1,"n":"one"}
        {"Id":2,"n":"two"}
        {"ID":3,"n":"three"}
        {"iD":4,"n":"four"}
    ' | jq -s 'def ids: map(.id // .Id // .ID); ids'

Arguments can be passed as filters ("lazy", "callbacks")

    printf '[1,2,3]' | jq 'def times(x): .*x; map(times(.))'

Separate multiple arguments with `;`

    printf '[1,2,3]' | jq 'def to_obj(k;v): {key:k, value:v}; map(to_obj("num"; .))'

Functions defined in your `~/.jq` are automatically imported!

See [`jqlang/jq:builtin.jq`](https://github.com/jqlang/jq/blob/master/src/builtin.jq) for the definition of builtin functions.


Variables
---------

Capture values to use later

    printf '[1,2,3]' | jq 'length as $len | map({count:$len,value:.})'

Destructure objects

    printf '{"name":"Jason","age":42,"movies":["The Transporter","The Beekeeper"]}' \
        | jq -c '. as {name: $firstname, age: $years, movies: [$transporter]} | ($firstname, $years, $transporter)'


Joining
-------

Create a lookup map:

    jq -n '[{id:1,name:"one"},{id:2,name:"two"}]' | jq 'INDEX(.[];.id)'

Perform SQL-like joins

    printf '[1, 2, 3]' | jq '{"1":{"name":"one"},"2":{"name":"two"}} as $idx | JOIN($idx; tostring)'
