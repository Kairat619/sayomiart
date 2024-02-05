Future Imperfect by HTML5 UP
html5up.net | @ajlkn
Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)


It's been a long time coming, but I've finally gotten around to creating a brand new
blog-style template (and the first since Striped, which came out waaaaay back in 2013).
Anyway, Future Imperfect features a clean, expansive layout, a toggleable search box,
and -- because pretty much all modern browsers can use it now -- a whole lot of flexbox
action. Enjoy it :)

Demo images* courtesy of Unsplash, a radtastic collection of CC0 (public domain) images
you can use for pretty much whatever.

(* = not included)

AJ
aj@lkn.io | @ajlkn


Credits:

	Demo Images:
		Unsplash (unsplash.com)

	Icons:
		Font Awesome (fontawesome.io)

	Other:
		jQuery (jquery.com)
		Responsive Tools (github.com/ajlkn/responsive-tools)

		For me:

		{% if loop.index0 < 4 %}
		{%- endif %}
		{% if pagination.href.previouse %} <a href = "{{ pagination.href.previous }}">Previous Page</a> {% endif %}
		{% if pagination.href.next %} <a href = "{{ pagination.href.next }}">Next Page</a> {% endif %}

		<div>
    <ul>
        <li>{% if pagination.href.previous %}<a href="{{ pagination.href.previous }}">Prev</a>{% endif %}</li>
        {%- for pageEntry in pagination.pages %}
            <li><a href="{{ pagination.hrefs[ loop.index0 ] }}">{{ loop.index }}</a></li>
        {%- endfor %}
        <li>{% if pagination.href.next %}<a href="{{ pagination.href.next }}">Next</a>{% endif %}</li>
    </ul>
        </div>
// post pagination
		{%- if collections.posts %}
{%- set previousPost = collections.posts | getPreviousCollectionItem %}
{%- set nextPost = collections.posts | getNextCollectionItem %}
{%- if nextPost or previousPost %}
<ul class="links-nextprev">
	{%- if previousPost %}<li>Previous: <a href="{{ previousPost.url }}">{{ previousPost.data.title }}</a></li>{% endif %}
	{%- if nextPost %}<li>Next: <a href="{{ nextPost.url }}">{{ nextPost.data.title }}</a></li>{% endif %}
</ul>
{%- endif %}
{%- endif %}

first comment